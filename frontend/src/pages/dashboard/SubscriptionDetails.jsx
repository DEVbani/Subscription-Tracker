import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, CalendarDays, CreditCard } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { subscriptions } from "../../data/subscriptions";
import { formatCurrency, formatDate } from "../../utils/format";

export default function SubscriptionDetails() {
  const { id } = useParams();
  const subscription = subscriptions.find((item) => item.id === id);

  if (!subscription) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-bold text-slate-900">Subscription not found</h1>
        <Link to="/subscriptions" className="mt-3 inline-block text-sm font-semibold text-blue-600">
          Back to subscriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/subscriptions" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft size={16} />
        Back to subscriptions
      </Link>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold text-white ${subscription.color}`}>
              {subscription.initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{subscription.name}</h1>
              <p className="mt-1 text-sm text-slate-500">{subscription.category}</p>
            </div>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Active
          </span>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <Info icon={CreditCard} label="Price" value={`${formatCurrency(subscription.price)} / ${subscription.cycle.toLowerCase()}`} />
          <Info icon={CalendarDays} label="Next payment" value={formatDate(subscription.nextPayment)} />
          <Info icon={CreditCard} label="Category" value={subscription.category} />
        </div>

        <div className="border-t border-slate-100 p-6">
          <h2 className="font-semibold text-slate-900">Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subscription.description}</p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
          <Button variant="danger">
            <Trash2 size={16} />
            Delete
          </Button>
          <Button>
            <Pencil size={16} />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <Icon size={18} className="text-blue-600" />
      <p className="mt-3 text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}