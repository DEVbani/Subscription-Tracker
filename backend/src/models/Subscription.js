import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Entertainment",
        "Music",
        "Productivity",
        "Developer",
        "Education",
        "Cloud",
        "Other",
      ],
      default: "Other",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
      maxlength: 3,
    },
    billingCycle: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
    },
    nextPaymentDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      maxlength: 1000,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "paused", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

subscriptionSchema.index({ userId: 1, nextPaymentDate: 1 });
subscriptionSchema.index({ userId: 1, category: 1 });

export default mongoose.model("Subscription", subscriptionSchema);