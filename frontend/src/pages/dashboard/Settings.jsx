import {
  useAuth,
} from "../../context/AuthContext";

export default function Settings() {
  const {
    user,
    logout,
  } = useAuth();

  return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

        <h2 className="text-lg font-semibold">
          Profile
        </h2>

        <div className="mt-5 space-y-4">

          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="font-medium">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-medium">
              {user?.email}
            </p>
          </div>

        </div>

      </div>


      <button
        onClick={logout}
        className="mt-6 rounded-xl bg-red-50 px-5 py-3 font-medium text-red-600"
      >
        Logout
      </button>

    </div>
  );
}