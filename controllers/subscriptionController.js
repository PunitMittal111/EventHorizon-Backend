// const Subscription = require("../models/Subscription");
// const Plan = require("../models/Plan");
// const User = require("../models/User");
// const { ErrorResponse } = require("../utils/errorResponse");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const createSubscription = async (req, res) => {
//   try {
//     const { planId, billingCycle, paymentMethodId } = req.body;
//     const userId = req.user.id;

//     const plan = await Plan.findById(planId);
//     if (!plan) {
//       return ErrorResponse(res, 404, "Plan not found");
//     }

//     const existingSubscription = await Subscription.findOne({
//       user: userId,
//       status: "active",
//     });

//     if (existingSubscription) {
//       return ErrorResponse(res, 400, "User already has an active subscription");
//     }

//     const amount =
//       billingCycle === "monthly" ? plan.price.monthly : plan.price.annual;
//     const endDate = new Date();
//     if (billingCycle === "monthly") {
//       endDate.setMonth(endDate.getMonth() + 1);
//     } else {
//       endDate.setFullYear(endDate.getFullYear() + 1);
//     }

//     const user = await User.findById(userId);
//     const customer = await stripe.customers.create({
//       email: user.email,
//       name: user.name,
//       payment_method: paymentMethodId,
//       invoice_settings: {
//         default_payment_method: paymentMethodId,
//       },
//     });

//     const stripeSubscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `${plan.name} Plan - ${billingCycle}`,
//             },
//             unit_amount: amount * 100,
//             recurring: {
//               interval: billingCycle === "monthly" ? "month" : "year",
//             },
//           },
//         },
//       ],
//       expand: ["latest_invoice.payment_intent"],
//     });

//     const subscription = await Subscription.create({
//       user: userId,
//       plan: planId,
//       billingCycle,
//       amount,
//       endDate,
//       stripeSubscriptionId: stripeSubscription.id,
//       stripeCustomerId: customer.id,
//     });

//     await User.findByIdAndUpdate(userId, { subscription: subscription._id });

//     await subscription.populate("plan");

//     ErrorResponse(res, 201, "Subscription created successfully", {
//       subscription,
//       clientSecret:
//         stripeSubscription.latest_invoice.payment_intent.client_secret,
//     });
//   } catch (error) {
//     ErrorResponse(res, 500, "Server Error", null, error.message);
//   }
// };

// const getUserSubscription = async (req, res) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: "active",
//     }).populate("plan");

//     if (!subscription) {
//       return ErrorResponse(res, 404, "No active subscription found");
//     }

//     ErrorResponse(res, 200, "Subscription retrieved successfully", {
//       subscription,
//     });
//   } catch (error) {
//     ErrorResponse(res, 500, "Server Error", null, error.message);
//   }
// };

// const cancelSubscription = async (req, res) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: "active",
//     });

//     if (!subscription) {
//       return ErrorResponse(res, 404, "No active subscription found");
//     }

//     await stripe.subscriptions.del(subscription.stripeSubscriptionId);

//     subscription.status = "cancelled";
//     await subscription.save();

//     await User.findByIdAndUpdate(req.user.id, { $unset: { subscription: 1 } });

//     ErrorResponse(res, 200, "Subscription cancelled successfully");
//   } catch (error) {
//     ErrorResponse(res, 500, "Server Error", null, error.message);
//   }
// };

// module.exports = {
//   createSubscription,
//   getUserSubscription,
//   cancelSubscription,
// };
