import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import type { Role } from "../lib/api";

const demos: { role: Role; email: string }[] = [
  { role: "employee", email: "employee@company.com" },
  { role: "manager", email: "manager@company.com" },
  { role: "finance", email: "finance@company.com" },
  { role: "ceo", email: "ceo@company.com" },
];

const homeFor: Record<Role, string> = {
  employee: "/my-expenses",
  manager: "/inbox",
  finance: "/inbox",
  ceo: "/inbox",
};

export function LoginPage() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("employee@company.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={homeFor[user.role]} replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const signedIn = await login(email, password);
      navigate(homeFor[signedIn.role]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-panel">
        <p className="eyebrow">Employee expense reimbursement</p>
        <h1>ReceiptScan Expense</h1>
        <p className="lede">
          Submit receipts on mobile or desktop. Managers, finance, and CEO approve by amount
          band.
        </p>
        <form className="stack" onSubmit={onSubmit}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn primary" disabled={busy} type="submit">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="demo-row">
          {demos.map((d) => (
            <button
              key={d.email}
              type="button"
              className="chip"
              onClick={() => {
                setEmail(d.email);
                setPassword("Password123!");
              }}
            >
              {d.role}
            </button>
          ))}
        </div>
        <p className="hint">Demo password for all roles: Password123!</p>
      </section>
      <div className="login-visual" aria-hidden="true" />
    </div>
  );
}
