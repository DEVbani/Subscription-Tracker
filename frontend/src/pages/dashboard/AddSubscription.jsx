import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useSubscriptions,
} from "../../context/SubscriptionContext";

export default function AddSubscription() {
  const navigate = useNavigate();

  const {
    addSubscription,
  } = useSubscriptions();

  const [form, setForm] =
    useState({
      name: "",
      category: "Entertainment",
      price: "",
      billingCycle: "monthly",
      nextPaymentDate: "",
      status: "active",
      notes: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await addSubscription({
        ...form,
        price: Number(form.price),
      });

      navigate("/subscriptions");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create subscription."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">

      <h1 className="text-3xl font-bold">
        Add subscription
      </h1>

      <p className="mt-1 text-slate-500">
        Add a recurring payment to your tracker.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
      >

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Netflix"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          >
            <option>Entertainment</option>
            <option>Music</option>
            <option>Software</option>
            <option>Cloud</option>
            <option>Gaming</option>
            <option>Education</option>
            <option>Fitness</option>
            <option>News</option>
            <option>Other</option>
          </select>
        </div>

        <Field
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="649"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Billing cycle
          </label>

          <select
            name="billingCycle"
            value={form.billingCycle}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
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
        </div>

        <Field
          label="Next payment"
          name="nextPaymentDate"
          type="date"
          value={form.nextPaymentDate}
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Optional notes..."
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Add subscription"}
        </button>

      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}