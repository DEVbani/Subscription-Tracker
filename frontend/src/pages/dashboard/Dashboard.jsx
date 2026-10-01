import { Link } from "react-router-dom";
import { CreditCard, IndianRupee, CalendarClock, TrendingUp, ArrowRight } from "lucide-react";
import Card from "../../components/ui/Card";
import StatCard from "../../components/dashboard/StatCard";
import SubscriptionCard from "../../components/subscriptions/SubscriptionCard";
import { subscriptions } from "../../data/subscriptions";
import { formatCurrency } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const monthly = subscriptions.reduce((sum, s) => sum + s.price, 0);
  const yearly = monthly * 12;

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-blue-600">Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Good evening, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here's what's happening with your subscriptions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Monthly spending"
          value={formatCurrency(monthly)}
          note="↑ 8.2% compared with last month"
          trend
          icon={IndianRupee}
        />
        <StatCard
          title="Yearly spending"
          value={formatCurrency(yearly)}
          note="Estimated recurring cost"
          icon={TrendingUp}
        />
        <StatCard
          title="Active subscriptions"
          value={subscriptions.length}
          note="All currently active"
          icon={CreditCard}
        />
        <StatCard
          title="Upcoming payments"
          value="4"
          note="Next 30 days"
          icon={CalendarClock}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold text-slate-900">Upcoming payments</h2>
              <p className="mt-1 text-xs text-slate-400">Your next recurring charges</p>
            </div>
            <Link to="/subscriptions" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          {subscriptions.slice(0, 4).map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Spending overview</h2>
              <p className="mt-1 text-xs text-slate-400">Monthly recurring cost</p>
            </div>
            <Link to="/analytics" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-7 flex h-52 items-end gap-3 border-b border-slate-100 px-2 pb-0">
            {[42, 58, 47, 71, 64, 83, 91].map((height, i) => (
              <div key={i} className="group flex h-full flex-1 items-end">
                <div
                  className="w-full rounded-t-lg bg-blue-100 transition group-hover:bg-blue-500"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between px-1 text-xs text-slate-400">
            {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}