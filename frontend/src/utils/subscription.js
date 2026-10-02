export function getMonthlyCost(subscription) {
  const price = Number(subscription.price);

  switch (subscription.billingCycle) {
    case "weekly":
      return (price * 52) / 12;

    case "monthly":
      return price;

    case "quarterly":
      return price / 3;

    case "yearly":
      return price / 12;

    default:
      return 0;
  }
}

export function getYearlyCost(subscription) {
  const price = Number(subscription.price);

  switch (subscription.billingCycle) {
    case "weekly":
      return price * 52;

    case "monthly":
      return price * 12;

    case "quarterly":
      return price * 4;

    case "yearly":
      return price;

    default:
      return 0;
  }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}