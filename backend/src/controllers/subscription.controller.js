import Subscription from "../models/Subscription.js";
import AppError from "../utils/AppError.js";

export async function createSubscription(req, res, next) {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function listSubscriptions(req, res, next) {
  try {
    const { category, status, search } = req.query;

    const filter = { userId: req.user._id };

    if (category) filter.category = category;
    if (status) filter.status = status;

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const subscriptions = await Subscription.find(filter).sort({
      nextPaymentDate: 1,
    });

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subscription) {
      return next(new AppError("Subscription not found", 404));
    }

    res.json({ success: true, subscription });
  } catch (error) {
    next(error);
  }
}

export async function updateSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subscription) {
      return next(new AppError("Subscription not found", 404));
    }

    res.json({ success: true, subscription });
  } catch (error) {
    next(error);
  }
}

export async function deleteSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subscription) {
      return next(new AppError("Subscription not found", 404));
    }

    res.json({ success: true, message: "Subscription deleted" });
  } catch (error) {
    next(error);
  }
}