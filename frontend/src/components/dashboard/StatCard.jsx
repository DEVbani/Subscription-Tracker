import Card from "../ui/Card";

export default function StatCard({ title, value, note, icon: Icon, trend }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>
      </div>
      <p className={`mt-4 text-xs ${trend ? "text-emerald-600" : "text-slate-400"}`}>
        {note}
      </p>
    </Card>
  );
}