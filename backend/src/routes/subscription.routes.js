import { Router } from "express";
import {
  createSubscription,
  listSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscription.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from "../validators/subscription.validator.js";

const router = Router();

router.use(requireAuth);

router.get("/", listSubscriptions);
router.post("/", validate(createSubscriptionSchema), createSubscription);
router.get("/:id", getSubscription);
router.patch("/:id", validate(updateSubscriptionSchema), updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;