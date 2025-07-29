const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "Plan",
    required: true,
  },
  billingCycle: {
    type: String,
    enum: ["monthly", "annual"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  stripeSubscriptionId: {
    type: String,
  },
  stripeCustomerId: {
    type: String,
  },
  usage: {
    eventsCreated: {
      type: Number,
      default: 0,
    },
    ticketsIssued: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
