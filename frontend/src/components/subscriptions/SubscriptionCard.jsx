import { Link } from "react-router-dom";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/format";

export default function SubscriptionCard({ subscription }) {
  return (
    <Link
      to={`/subscriptions/${subscription.id}`}
      className="group flex items-center gap-4 border-b border-slate-100 p-4 transition last:border-0 hover:bg-slate-50"
    >
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${subscription.color}`}>
        {subscription.initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{subscription.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{subscription.category}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-slate-900">
          {formatCurrency(subscription.price)}
        </p>
        <p className="text-xs text-slate-400">{subscription.cycle.toLowerCase()}</p>
      </div>

      <div className="hidden text-right md:block">
        <p className="text-xs text-slate-400">Next payment</p>
        <p className="mt-0.5 text-sm font-medium text-slate-700">
          {formatDate(subscription.nextPayment)}
        </p>
      </div>

      <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:inline-flex">
        Active
      </span>

      <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-500" />
      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600" />
    </Link>
  );
}