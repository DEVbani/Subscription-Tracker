import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

import {
  formatCurrency,
  formatDate,
} from "../../utils/subscription";

export default function Subscriptions() {
  const {
    subscriptions,
    loading,
    deleteSubscription,
  } = useSubscriptions();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const filtered =
    subscriptions.filter(
      (subscription) => {
        const matchesSearch =
          subscription.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === "all" ||
          subscription.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Delete this subscription?"
      );

    if (!confirmed) return;

    await deleteSubscription(id);
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Subscriptions
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all your recurring payments.
          </p>
        </div>

        <Link
          to="/subscriptions/new"
          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700"
        >
          + Add subscription
        </Link>

      </div>


      {/* FILTER */}

      <div className="flex flex-col gap-3 sm:flex-row">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search subscriptions..."
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
        >
          <option value="all">
            All categories
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Music">
            Music
          </option>

          <option value="Software">
            Software
          </option>

          <option value="Cloud">
            Cloud
          </option>

          <option value="Gaming">
            Gaming
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Fitness">
            Fitness
          </option>

          <option value="News">
            News
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>


      {/* LIST */}

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">

          <h3 className="font-semibold">
            No subscriptions found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add your first subscription.
          </p>

        </div>
      ) : (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filtered.map(
            (subscription) => (
              <div
                key={subscription._id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {subscription.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {subscription.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {subscription.status}
                  </span>

                </div>

                <div className="mt-6">

                  <p className="text-2xl font-bold">
                    {formatCurrency(
                      subscription.price
                    )}
                  </p>

                  <p className="text-sm text-slate-500">
                    / {subscription.billingCycle}
                  </p>

                </div>

                <div className="mt-4 text-sm text-slate-500">
                  Next payment:{" "}
                  {formatDate(
                    subscription.nextPaymentDate
                  )}
                </div>

                <div className="mt-5 flex gap-2">

                  <button
                    onClick={() =>
                      navigate(
                        `/subscriptions/${subscription._id}`
                      )
                    }
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/subscriptions/${subscription._id}/edit`
                      )
                    }
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        subscription._id
                      )
                    }
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
}