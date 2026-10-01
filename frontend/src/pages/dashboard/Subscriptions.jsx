import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SubscriptionCard from "../../components/subscriptions/SubscriptionCard";
import { subscriptions } from "../../data/subscriptions";

export default function Subscriptions() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(subscriptions.map((s) => s.category))];

  const filtered = useMemo(
    () =>
      subscriptions.filter((s) => {
        const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All" || s.category === category;
        return matchesQuery && matchesCategory;
      }),
    [query, category]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">Manage</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Subscriptions</h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep all your recurring services in one place.
          </p>
        </div>
        <Link to="/subscriptions/new">
          <Button>
            <Plus size={18} />
            Add subscription
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
            <Search size={17} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subscriptions..."
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <Filter size={16} className="text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent py-2.5 text-sm outline-none"
            >
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="px-1">
          {filtered.length ? (
            filtered.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="font-semibold text-slate-700">No subscriptions found</p>
              <p className="mt-1 text-sm text-slate-400">Try another search or category.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}