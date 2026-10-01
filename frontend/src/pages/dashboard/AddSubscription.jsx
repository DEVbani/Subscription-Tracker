import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AddSubscription() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "Entertainment",
    price: "",
    cycle: "Monthly",
    nextPayment: "",
    notes: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    // Replace with POST /api/subscriptions later.
    navigate("/subscriptions");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link to="/subscriptions" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
          <ArrowLeft size={16} />
          Back to subscriptions
        </Link>
        <h1 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">Add subscription</h1>
        <p className="mt-2 text-sm text-slate-500">Add a recurring service to your tracker.</p>
      </div>

      <Card className="p-5 sm:p-7">
        <form onSubmit={submit} className="space-y-5">
          <Input
            label="Service name"
            placeholder="Netflix"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option>Entertainment</option>
                <option>Music</option>
                <option>Productivity</option>
                <option>Developer</option>
                <option>Education</option>
                <option>Cloud</option>
                <option>Other</option>
              </select>
            </div>

            <Input
              label="Price"
              type="number"
              min="0"
              placeholder="649"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Billing cycle</label>
              <select
                value={form.cycle}
                onChange={(e) => update("cycle", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option>Monthly</option>
                <option>Yearly</option>
                <option>Weekly</option>
              </select>
            </div>

            <Input
              label="Next payment"
              type="date"
              value={form.nextPayment}
              onChange={(e) => update("nextPayment", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              rows="4"
              placeholder="Optional notes..."
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Link to="/subscriptions">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit">
              <Save size={17} />
              Save subscription
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}