const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export type Role = "employee" | "manager" | "finance" | "ceo";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type Expense = {
  id: string;
  amount: number;
  currency: string;
  purpose: string;
  category: string;
  status: string;
  receiptPath: string | null;
  receiptUrl: string | null;
  fundsAvailable: boolean | null;
  submittedById: string;
  createdAt: string;
  updatedAt: string;
  amountBand?: string;
  requiresCeo?: boolean;
  submittedBy?: { id: string; name: string; email: string; role: Role };
  actions?: Array<{
    id: string;
    action: string;
    comment: string | null;
    createdAt: string;
    actor: { id: string; name: string; role: Role };
  }>;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as T;
}

export async function login(email: string, password: string) {
  return handle<{ token: string; user: User }>(
    await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
}

export async function me() {
  return handle<{ user: User }>(
    await fetch(`${API_BASE}/api/auth/me`, { headers: { ...authHeaders() } })
  );
}

export async function listExpenses(scope: "mine" | "inbox" | "auto" = "auto") {
  return handle<{ expenses: Expense[] }>(
    await fetch(`${API_BASE}/api/expenses?scope=${scope}`, {
      headers: { ...authHeaders() },
    })
  );
}

export async function getExpense(id: string) {
  return handle<{ expense: Expense }>(
    await fetch(`${API_BASE}/api/expenses/${id}`, {
      headers: { ...authHeaders() },
    })
  );
}

export async function createExpense(form: FormData) {
  return handle<{ expense: Expense }>(
    await fetch(`${API_BASE}/api/expenses`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    })
  );
}

export async function decideExpense(
  id: string,
  body: { action: "approve" | "reject"; comment?: string; fundsAvailable?: boolean }
) {
  return handle<{ expense: Expense }>(
    await fetch(`${API_BASE}/api/expenses/${id}/decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(body),
    })
  );
}

export function receiptSrc(receiptUrl: string | null | undefined) {
  if (!receiptUrl) return null;
  const token = localStorage.getItem("token");
  const base = receiptUrl.startsWith("http") ? receiptUrl : `${API_BASE}${receiptUrl}`;
  if (!token) return base;
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}token=${encodeURIComponent(token)}`;
}
