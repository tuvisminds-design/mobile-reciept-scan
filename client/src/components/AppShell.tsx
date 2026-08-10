import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../lib/auth";
import type { Role } from "../lib/api";

const roleHome: Record<Role, string> = {
  employee: "/my-expenses",
  manager: "/inbox",
  finance: "/inbox",
  ceo: "/inbox",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  if (!user) return <>{children}</>;

  return (
    <div className="shell">
      <header className="topbar">
        <Link to={roleHome[user.role]} className="brand">
          ReceiptScan Expense
        </Link>
        <nav className="nav">
          {(user.role === "employee" || user.role === "manager") && (
            <>
              <NavLink to="/submit">Submit</NavLink>
              <NavLink to="/my-expenses">My expenses</NavLink>
            </>
          )}
          {(user.role === "manager" || user.role === "finance" || user.role === "ceo") && (
            <NavLink to="/inbox">Inbox</NavLink>
          )}
        </nav>
        <div className="userchip">
          <span>
            {user.name} · {user.role}
          </span>
          <button type="button" className="btn ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
