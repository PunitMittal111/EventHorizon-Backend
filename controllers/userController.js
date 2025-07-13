const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, orgName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    orgName,
  });

  const userObj = user.toObject();
  delete userObj.password;
  console.log(userObj);
  res.status(201).json({
    success: true,
    data: userObj,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  // Only include fields that are actually provided
  const fieldsToUpdate = {};

  if (req.body.name !== undefined) fieldsToUpdate.name = req.body.name;
  if (req.body.email !== undefined) fieldsToUpdate.email = req.body.email;
  if (req.body.phone !== undefined) fieldsToUpdate.phone = req.body.phone;
  if (req.body.orgName !== undefined) fieldsToUpdate.orgName = req.body.orgName;
  if (req.body.profilePhoto !== undefined)
    fieldsToUpdate.profilePhoto = req.body.profilePhoto;

  const userId = req.user?._id || req.params.id;

  const user = await User.findByIdAndUpdate(userId, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select("-password"); // Exclude password from response

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user: user, 
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
