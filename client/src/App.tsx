import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AuthProvider, useAuth } from "./lib/auth";
import type { Role } from "./lib/api";
import { LoginPage } from "./pages/LoginPage";
import { SubmitExpensePage } from "./pages/SubmitExpensePage";
import { MyExpensesPage } from "./pages/MyExpensesPage";
import { InboxPage } from "./pages/InboxPage";
import { ExpenseDetailPage } from "./pages/ExpenseDetailPage";

function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Role[];
}) {
  const { user, loading } = useAuth();
  if (loading) return <p className="page">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === "employee" ? "/my-expenses" : "/inbox"} replace />;
  }
  return <AppShell>{children}</AppShell>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/submit"
        element={
          <Protected roles={["employee", "manager"]}>
            <SubmitExpensePage />
          </Protected>
        }
      />
      <Route
        path="/my-expenses"
        element={
          <Protected roles={["employee", "manager"]}>
            <MyExpensesPage />
          </Protected>
        }
      />
      <Route
        path="/inbox"
        element={
          <Protected roles={["manager", "finance", "ceo"]}>
            <InboxPage />
          </Protected>
        }
      />
      <Route
        path="/expenses/:id"
        element={
          <Protected>
            <ExpenseDetailPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
