import { z } from "zod";

const categories = [
  "Entertainment",
  "Music",
  "Productivity",
  "Developer",
  "Education",
  "Cloud",
  "Other",
];

export const createSubscriptionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  category: z.enum(categories).default("Other"),
  price: z.number().min(0),
  currency: z.string().length(3).default("INR"),
  billingCycle: z.enum(["weekly", "monthly", "yearly"]).default("monthly"),
  nextPaymentDate: z.coerce.date(),
  notes: z.string().max(1000).optional().default(""),
  status: z.enum(["active", "paused", "cancelled"]).optional().default("active"),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();