import {
  Link,
} from "react-router-dom";

import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

import {
  getMonthlyCost,
  getYearlyCost,
  formatCurrency,
  formatDate,
} from "../../utils/subscription";

export default function Dashboard() {
  const {
    subscriptions,
    loading,
  } = useSubscriptions();

  if (loading) {
    return (
      <div className="p-8">
        Loading subscriptions...
      </div>
    );
  }

  const active =
    subscriptions.filter(
      (item) =>
        item.status === "active"
    );

  const monthly =
    active.reduce(
      (total, item) =>
        total +
        getMonthlyCost(item),
      0
    );

  const yearly =
    active.reduce(
      (total, item) =>
        total +
        getYearlyCost(item),
      0
    );

  const upcoming = [...active]
    .sort(
      (a, b) =>
        new Date(
          a.nextPaymentDate
        ) -
        new Date(
          b.nextPaymentDate
        )
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Keep track of your recurring expenses.
        </p>
      </div>


      {/* STATS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <Stat
          title="Monthly spending"
          value={formatCurrency(monthly)}
        />

        <Stat
          title="Yearly spending"
          value={formatCurrency(yearly)}
        />

        <Stat
          title="Active subscriptions"
          value={active.length}
        />

        <Stat
          title="Total subscriptions"
          value={subscriptions.length}
        />

      </div>


      {/* UPCOMING */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold">
              Upcoming payments
            </h2>

            <p className="text-sm text-slate-500">
              Your next subscription charges.
            </p>
          </div>

          <Link
            to="/subscriptions"
            className="text-sm font-medium text-blue-600"
          >
            View all
          </Link>

        </div>


        {upcoming.length === 0 ? (
          <p className="py-8 text-center text-slate-500">
            No upcoming payments.
          </p>
        ) : (
          <div className="divide-y">

            {upcoming.map(
              (subscription) => (
                <div
                  key={subscription._id}
                  className="flex items-center justify-between py-4"
                >

                  <div>
                    <p className="font-medium">
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
        )}

      </div>

    </div>
  );
}


function Stat({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}