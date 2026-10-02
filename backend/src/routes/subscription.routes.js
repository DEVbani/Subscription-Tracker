import express from "express";

import {
  createSubscription,
  getSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscription.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getSubscriptions);

router.post("/", createSubscription);

router.get("/:id", getSubscription);

router.patch("/:id", updateSubscription);

router.delete("/:id", deleteSubscription);

export default router;
