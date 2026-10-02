import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

export default function EditSubscription() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    subscriptions,
    updateSubscription,
  } = useSubscriptions();

  const subscription =
    subscriptions.find(
      (item) => item._id === id
    );

  const [form, setForm] =
    useState(null);

  useEffect(() => {
    if (subscription) {
      setForm({
        name: subscription.name,
        category: subscription.category,
        price: subscription.price,
        billingCycle:
          subscription.billingCycle,
        nextPaymentDate:
          subscription.nextPaymentDate?.slice(
            0,
            10
          ),
        status: subscription.status,
        notes: subscription.notes || "",
      });
    }
  }, [subscription]);

  if (!subscription || !form) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateSubscription(id, {
      ...form,
      price: Number(form.price),
    });

    navigate(
      `/subscriptions/${id}`
    );
  }

  return (
    <div className="mx-auto max-w-2xl">

      <h1 className="text-3xl font-bold">
        Edit subscription
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
      >

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
          required
        />

        <select
          name="billingCycle"
          value={form.billingCycle}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="weekly">
            Weekly
          </option>

          <option value="monthly">
            Monthly
          </option>

          <option value="quarterly">
            Quarterly
          </option>

          <option value="yearly">
            Yearly
          </option>
        </select>

        <input
          name="nextPaymentDate"
          type="date"
          value={form.nextPaymentDate}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">
          Save changes
        </button>

      </form>

    </div>
  );
}