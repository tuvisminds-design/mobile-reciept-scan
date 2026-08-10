import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createExpense } from "../lib/api";

export function SubmitExpensePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("Travel");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onFile(f: File | null) {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f && f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Receipt is required");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("amount", amount);
      form.append("purpose", purpose);
      form.append("category", category);
      form.append("receipt", file);
      const { expense } = await createExpense(form);
      navigate(`/expenses/${expense.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page">
      <header className="page-head">
        <h1>Submit expense</h1>
        <p>Capture or upload a receipt, then send it to your manager for review.</p>
      </header>
      <form className="card form-grid" onSubmit={onSubmit}>
        <label>
          Amount (INR)
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 25000"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Travel</option>
            <option>Meals</option>
            <option>Office supplies</option>
            <option>Client entertainment</option>
            <option>Other</option>
          </select>
        </label>
        <label className="full">
          Purpose
          <textarea
            required
            rows={3}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Business purpose of this expense"
          />
        </label>
        <label className="full">
          Receipt (camera on mobile, file on desktop)
          <input
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            required
            onChange={(e) => onFile(e.target.files?.[0] || null)}
          />
        </label>
        {preview && (
          <div className="full receipt-preview">
            <img src={preview} alt="Receipt preview" />
          </div>
        )}
        <div className="policy-note full">
          <strong>Approval bands:</strong> under ₹40k → Manager → Finance → Paid. ₹40k–₹4L →
          funds check by Finance. ₹4L–₹4 Cr → CEO approval required.
        </div>
        {error && <p className="error full">{error}</p>}
        <div className="full actions">
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Submitting…" : "Submit for approval"}
          </button>
        </div>
      </form>
    </section>
  );
}
