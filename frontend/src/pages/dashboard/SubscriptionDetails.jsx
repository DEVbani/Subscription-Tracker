import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

import {
  formatCurrency,
  formatDate,
  getMonthlyCost,
  getYearlyCost,
} from "../../utils/subscription";

export default function SubscriptionDetails() {
  const { id } = useParams();

  const {
    subscriptions,
  } = useSubscriptions();

  const subscription =
    subscriptions.find(
      (item) => item._id === id
    );

  if (!subscription) {
    return (
      <div>
        Subscription not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">

      <div className="rounded-2xl border border-slate-200 bg-white p-8">

        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm text-slate-500">
              {subscription.category}
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              {subscription.name}
            </h1>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
            {subscription.status}
          </span>

        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <Info
            title="Price"
            value={formatCurrency(
              subscription.price
            )}
          />

          <Info
            title="Billing"
            value={subscription.billingCycle}
          />

          <Info
            title="Next payment"
            value={formatDate(
              subscription.nextPaymentDate
            )}
          />

          <Info
            title="Monthly cost"
            value={formatCurrency(
              getMonthlyCost(
                subscription
              )
            )}
          />

          <Info
            title="Yearly cost"
            value={formatCurrency(
              getYearlyCost(
                subscription
              )
            )}
          />

        </div>

        {subscription.notes && (
          <div className="mt-8">
            <h3 className="font-semibold">
              Notes
            </h3>

            <p className="mt-2 text-slate-600">
              {subscription.notes}
            </p>
          </div>
        )}

        <Link
          to={`/subscriptions/${id}/edit`}
          className="mt-8 inline-block rounded-xl bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Edit subscription
        </Link>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-semibold capitalize">
        {value}
      </p>
    </div>
  );
}