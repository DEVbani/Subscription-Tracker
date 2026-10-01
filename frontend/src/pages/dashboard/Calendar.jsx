import Card from "../../components/ui/Card";
import { CalendarDays } from "lucide-react";
import { subscriptions } from "../../data/subscriptions";
import { formatDate, formatCurrency } from "../../utils/format";

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Schedule</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Payment calendar</h1>
        <p className="mt-2 text-sm text-slate-500">See when your recurring charges are due.</p>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">October 2026</h2>
            <p className="text-xs text-slate-400">Upcoming payment schedule</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">{s.name}</p>
              <p className="mt-1 text-xs text-slate-400">{formatDate(s.nextPayment)}</p>
              <p className="mt-4 text-sm font-bold text-slate-800">{formatCurrency(s.price)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}