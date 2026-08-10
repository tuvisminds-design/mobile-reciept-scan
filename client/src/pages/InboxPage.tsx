import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listExpenses, type Expense } from "../lib/api";
import { useAuth } from "../lib/auth";

function StatusBadge({ status }: { status: string }) {
  return <span className={`badge status-${status}`}>{status.replaceAll("_", " ")}</span>;
}

export function InboxPage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listExpenses("inbox")
      .then((r) => setExpenses(r.expenses))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const title =
    user?.role === "manager"
      ? "Manager inbox"
      : user?.role === "finance"
        ? "Finance inbox"
        : "CEO inbox";

  return (
    <section className="page">
      <header className="page-head">
        <h1>{title}</h1>
        <p>Review pending expense requests assigned to your role.</p>
      </header>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !expenses.length && <p className="empty">No pending items.</p>}

      <div className="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Band</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.submittedBy?.name}</td>
                <td>
                  <Link to={`/expenses/${e.id}`}>{e.purpose}</Link>
                </td>
                <td>₹{e.amount.toLocaleString("en-IN")}</td>
                <td>{e.amountBand}</td>
                <td>
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-list mobile-only">
        {expenses.map((e) => (
          <Link key={e.id} to={`/expenses/${e.id}`} className="expense-card">
            <div className="expense-card-top">
              <strong>{e.purpose}</strong>
              <StatusBadge status={e.status} />
            </div>
            <div className="muted">
              {e.submittedBy?.name} · ₹{e.amount.toLocaleString("en-IN")}
            </div>
            <div className="muted small">{e.amountBand}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
