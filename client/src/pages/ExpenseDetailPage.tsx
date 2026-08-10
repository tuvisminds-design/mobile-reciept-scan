import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { decideExpense, getExpense, receiptSrc, type Expense } from "../lib/api";
import { useAuth } from "../lib/auth";

export function ExpenseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [comment, setComment] = useState("");
  const [fundsAvailable, setFundsAvailable] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!id) return;
    const r = await getExpense(id);
    setExpense(r.expense);
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [id]);

  const canDecide =
    !!expense &&
    !!user &&
    ((user.role === "manager" && expense.status === "manager_review") ||
      (user.role === "finance" && expense.status === "finance_review") ||
      (user.role === "ceo" && expense.status === "ceo_review"));

  const needsFunds =
    canDecide && (user?.role === "finance" || user?.role === "ceo") && (expense?.amount ?? 0) >= 40000;

  async function onDecide(action: "approve" | "reject") {
    if (!id) return;
    setBusy(true);
    setError("");
    try {
      const body: {
        action: "approve" | "reject";
        comment?: string;
        fundsAvailable?: boolean;
      } = { action, comment: comment || undefined };
      if (action === "approve" && needsFunds) {
        body.fundsAvailable = fundsAvailable;
      }
      const r = await decideExpense(id, body);
      setExpense(r.expense);
      setComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decision failed");
    } finally {
      setBusy(false);
    }
  }

  function onSubmitApprove(e: FormEvent) {
    e.preventDefault();
    void onDecide("approve");
  }

  if (!expense) {
    return (
      <section className="page">
        {error ? <p className="error">{error}</p> : <p>Loading…</p>}
      </section>
    );
  }

  const src = receiptSrc(expense.receiptUrl);

  return (
    <section className="page">
      <p className="back">
        <Link to={user?.role === "employee" ? "/my-expenses" : "/inbox"}>← Back</Link>
      </p>
      <header className="page-head">
        <h1>{expense.purpose}</h1>
        <p>
          ₹{expense.amount.toLocaleString("en-IN")} · {expense.category} ·{" "}
          <span className={`badge status-${expense.status}`}>
            {expense.status.replaceAll("_", " ")}
          </span>
        </p>
        <p className="muted">{expense.amountBand}</p>
      </header>

      <div className="detail-grid">
        <article className="card">
          <h2>Details</h2>
          <dl className="meta">
            <div>
              <dt>Submitted by</dt>
              <dd>{expense.submittedBy?.name}</dd>
            </div>
            <div>
              <dt>Submitted at</dt>
              <dd>{new Date(expense.createdAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Funds available</dt>
              <dd>
                {expense.fundsAvailable == null
                  ? "Not set"
                  : expense.fundsAvailable
                    ? "Yes"
                    : "No"}
              </dd>
            </div>
          </dl>

          <h3>History</h3>
          <ul className="timeline">
            {(expense.actions || []).map((a) => (
              <li key={a.id}>
                <strong>
                  {a.actor.name} ({a.actor.role})
                </strong>{" "}
                — {a.action.replaceAll("_", " ")}
                <div className="muted small">{new Date(a.createdAt).toLocaleString()}</div>
                {a.comment && <div className="comment">{a.comment}</div>}
              </li>
            ))}
          </ul>

          {canDecide && (
            <form className="decision" onSubmit={onSubmitApprove}>
              <h3>Your decision</h3>
              {needsFunds && (
                <label className="check">
                  <input
                    type="checkbox"
                    checked={fundsAvailable}
                    onChange={(e) => setFundsAvailable(e.target.checked)}
                  />
                  Funds are available
                </label>
              )}
              <label>
                Comment
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Optional note"
                />
              </label>
              {error && <p className="error">{error}</p>}
              <div className="actions">
                <button className="btn primary" type="submit" disabled={busy}>
                  Approve
                </button>
                <button
                  className="btn danger"
                  type="button"
                  disabled={busy}
                  onClick={() => void onDecide("reject")}
                >
                  Reject
                </button>
              </div>
            </form>
          )}
        </article>

        <article className="card">
          <h2>Receipt</h2>
          {src ? (
            src.toLowerCase().endsWith(".pdf") ? (
              <a href={src} target="_blank" rel="noreferrer">
                Open PDF receipt
              </a>
            ) : (
              <img className="receipt-full" src={src} alt="Expense receipt" />
            )
          ) : (
            <p className="muted">No receipt attached</p>
          )}
        </article>
      </div>
    </section>
  );
}
