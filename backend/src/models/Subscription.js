import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      billingCycle: {
        type: String,
        enum: [
          "weekly",
          "monthly",
          "quarterly",
          "yearly",
        ],
        required: true,
      },

      nextPaymentDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "active",
          "paused",
          "cancelled",
        ],
        default: "active",
      },

      notes: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Subscription",
  subscriptionSchema
);