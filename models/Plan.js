const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a plan name"],
    enum: ["Starter", "Professional", "Enterprise"],
  },
  description: {
    type: String,
    required: [true, "Please provide a plan description"],
  },
  price: {
    monthly: {
      type: Number,
      required: [true, "Please provide monthly price"],
    },
    annual: {
      type: Number,
      required: [true, "Please provide annual price"],
    },
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", planSchema);
