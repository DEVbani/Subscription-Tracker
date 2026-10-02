import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

import {
  getMonthlyCost,
  formatCurrency,
} from "../../utils/subscription";

export default function Analytics() {
  const {
    subscriptions,
  } = useSubscriptions();

  const active =
    subscriptions.filter(
      (item) =>
        item.status === "active"
    );

  const categories = {};

  active.forEach(
    (subscription) => {
      const category =
        subscription.category;

      categories[category] =
        (categories[category] || 0) +
        getMonthlyCost(
          subscription
        );
    }
  );

  const sorted =
    Object.entries(categories)
      .sort(
        (a, b) => b[1] - a[1]
      );

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <p className="mt-1 text-slate-500">
        Understand where your recurring spending goes.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

        <h2 className="text-lg font-semibold">
          Monthly spending by category
        </h2>

        <div className="mt-6 space-y-5">

          {sorted.map(
            ([category, amount]) => {

              const total =
                active.reduce(
                  (sum, item) =>
                    sum +
                    getMonthlyCost(
                      item
                    ),
                  0
                );

              const percentage =
                total === 0
                  ? 0
                  : (amount / total) *
                    100;

              return (
                <div key={category}>

                  <div className="flex justify-between text-sm">

                    <span>
                      {category}
                    </span>

                    <span className="font-medium">
                      {formatCurrency(
                        amount
                      )}
                    </span>

                  </div>

                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}