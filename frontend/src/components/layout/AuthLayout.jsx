import { Outlet } from "react-router-dom";
import { CreditCard } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600">
                <CreditCard size={20} />
              </span>
              SubTrack
            </div>
          </div>

          <div className="max-w-md">
            <p className="mb-4 text-sm font-semibold text-blue-400">SUBSCRIPTION MANAGEMENT</p>
            <h1 className="text-5xl font-bold leading-tight">
              Know where your recurring money goes.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Keep subscriptions, renewal dates and monthly spending in one simple dashboard.
            </p>
          </div>

          <p className="text-sm text-slate-500">© 2026 SubTrack</p>
        </div>

        <main className="flex min-h-screen items-center justify-center p-6 sm:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}