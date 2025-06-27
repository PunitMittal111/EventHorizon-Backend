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
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
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
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const userId = req.user?._id || req.params.id;

  const user = await User.findByIdAndUpdate(userId, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
