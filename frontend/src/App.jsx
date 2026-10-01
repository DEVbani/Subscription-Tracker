import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Subscriptions from "./pages/dashboard/Subscriptions";
import AddSubscription from "./pages/dashboard/AddSubscription";
import SubscriptionDetails from "./pages/dashboard/SubscriptionDetails";
import Calendar from "./pages/dashboard/Calendar";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/subscriptions" element={<Subscriptions />} />

            <Route path="/subscriptions/new" element={<AddSubscription />} />

            <Route
              path="/subscriptions/:id"
              element={<SubscriptionDetails />}
            />

            <Route path="/calendar" element={<Calendar />} />

            <Route path="/analytics" element={<Analytics />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
