import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listExpenses, type Expense } from "../lib/api";

function StatusBadge({ status }: { status: string }) {
  return <span className={`badge status-${status}`}>{status.replaceAll("_", " ")}</span>;
}

export function MyExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listExpenses("mine")
      .then((r) => setExpenses(r.expenses))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page">
      <header className="page-head row">
        <div>
          <h1>My expenses</h1>
          <p>Track submissions and approval status.</p>
        </div>
        <Link className="btn primary" to="/submit">
          New expense
        </Link>
      </header>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !expenses.length && <p className="empty">No expenses yet.</p>}

      <div className="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>
                  <Link to={`/expenses/${e.id}`}>{e.purpose}</Link>
                </td>
                <td>₹{e.amount.toLocaleString("en-IN")}</td>
                <td>{e.category}</td>
                <td>
                  <StatusBadge status={e.status} />
                </td>
                <td>{new Date(e.createdAt).toLocaleString()}</td>
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
              ₹{e.amount.toLocaleString("en-IN")} · {e.category}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
