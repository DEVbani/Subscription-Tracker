import { TrendingUp, PieChart, IndianRupee } from "lucide-react";
import Card from "../../components/ui/Card";
import StatCard from "../../components/dashboard/StatCard";
import { subscriptions } from "../../data/subscriptions";
import { formatCurrency } from "../../utils/format";

export default function Analytics() {
  const total = subscriptions.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-blue-600">Insights</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Analytics</h1>
        <p className="mt-2 text-sm text-slate-500">Understand where your recurring money goes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Monthly total" value={formatCurrency(total)} note="Current recurring cost" icon={IndianRupee} />
        <StatCard title="Yearly estimate" value={formatCurrency(total * 12)} note="Based on active subscriptions" icon={TrendingUp} />
        <StatCard title="Categories" value="5" note="Across your subscriptions" icon={PieChart} />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-slate-900">Spending by subscription</h2>
        <div className="mt-6 space-y-5">
          {subscriptions.map((s) => {
            const percent = Math.round((s.price / total) * 100);
            return (
              <div key={s.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className="text-slate-500">{formatCurrency(s.price)} · {percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}