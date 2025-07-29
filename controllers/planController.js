const Plan = require("../models/Plan");

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: plans,
      message: "Plans retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving plans",
      error: error.message,
    });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: plan,
      message: "Plan retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving plan",
      error: error.message,
    });
  }
};

exports.getPopularPlans = async (req, res) => {
  try {
    const plans = await Plan.find({
      isPopular: true,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: plans,
      message: "Popular plans retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving popular plans",
      error: error.message,
    });
  }
};
