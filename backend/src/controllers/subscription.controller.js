import Subscription from "../models/Subscription.js";

export async function createSubscription(req, res, next) {
  try {
    console.log("Authenticated user:", req.user);
    const subscription = await Subscription.create({
      user: req.user.id,

      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      currency: req.body.currency || "INR",
      billingCycle: req.body.billingCycle,
      nextPaymentDate: req.body.nextPaymentDate,
      status: req.body.status || "active",
      notes: req.body.notes || "",
    });

    res.status(201).json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSubscriptions(req, res, next) {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id,
    }).sort({
      nextPaymentDate: 1,
    });

    res.status(200).json({
      success: true,
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
      user: req.user.id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        currency: req.body.currency || "INR",
        billingCycle: req.body.billingCycle,
        nextPaymentDate: req.body.nextPaymentDate,
        status: req.body.status,
        notes: req.body.notes,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.json({
      success: true,
      message: "Subscription deleted",
    });
  } catch (error) {
    next(error);
  }
}
