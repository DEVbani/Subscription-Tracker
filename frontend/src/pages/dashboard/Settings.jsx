import { useState } from "react";
import { User, Shield, Bell } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Account</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Manage your profile and preferences.</p>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><User size={19} /></div>
          <div>
            <h2 className="font-semibold text-slate-900">Profile</h2>
            <p className="text-xs text-slate-400">Your account information</p>
          </div>
        </div>
        <div className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button>Save changes</Button>
        </div>
      </Card>

      <Card className="divide-y divide-slate-100">
        <SettingRow icon={Shield} title="Security" description="Password, sessions and authentication" />
        <SettingRow icon={Bell} title="Notifications" description="Payment reminders and account notifications" />
      </Card>
    </div>
  );
}

function SettingRow({ icon: Icon, title, description }) {
  return (
    <button className="flex w-full items-center gap-4 p-5 text-left hover:bg-slate-50">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </button>
  );
}