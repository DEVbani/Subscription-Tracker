import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

import {
  formatCurrency,
  formatDate,
} from "../../utils/subscription";

export default function Calendar() {
  const {
    subscriptions,
  } = useSubscriptions();

  const upcoming =
    [...subscriptions]
      .filter(
        (item) =>
          item.status === "active"
      )
      .sort(
        (a, b) =>
          new Date(
            a.nextPaymentDate
          ) -
          new Date(
            b.nextPaymentDate
          )
      );

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Payment calendar
      </h1>

      <p className="mt-1 text-slate-500">
        Upcoming subscription payments.
      </p>

      <div className="mt-8 space-y-3">

        {upcoming.map(
          (subscription) => (
            <div
              key={subscription._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
            >

              <div>
                <p className="font-semibold">
                  {subscription.name}
                </p>

                <p className="text-sm text-slate-500">
                  {formatDate(
                    subscription.nextPaymentDate
                  )}
                </p>
              </div>

              <p className="font-semibold">
                {formatCurrency(
                  subscription.price
                )}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}