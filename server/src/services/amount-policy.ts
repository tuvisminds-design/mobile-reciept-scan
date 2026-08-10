export type ExpenseStatus =
  | "submitted"
  | "manager_review"
  | "finance_review"
  | "ceo_review"
  | "approved"
  | "rejected"
  | "paid";

export const THRESHOLD_LOW = 40_000;
export const THRESHOLD_HIGH = 400_000;
export const THRESHOLD_CEO_MAX = 40_000_000; // 4 Cr

export function requiresCeo(amount: number): boolean {
  return amount >= THRESHOLD_HIGH && amount <= THRESHOLD_CEO_MAX;
}

export function needsFundsCheck(amount: number): boolean {
  return amount >= THRESHOLD_LOW;
}

/**
 * After finance (or CEO) approval, decide next status.
 * - < 40k: paid (no funds check required)
 * - 40k–4L: paid if funds available, else stay / block
 * - 4L–4Cr: ceo_review after finance; paid after CEO if funds available
 */
export function nextStatusAfterFinanceApprove(
  amount: number,
  fundsAvailable: boolean | null | undefined
): { next: ExpenseStatus; error?: string } {
  if (requiresCeo(amount)) {
    return { next: "ceo_review" };
  }
  if (needsFundsCheck(amount)) {
    if (fundsAvailable !== true) {
      return {
        next: "finance_review",
        error: "Funds must be confirmed available for amounts ₹40,000 and above",
      };
    }
    return { next: "paid" };
  }
  return { next: "paid" };
}

export function nextStatusAfterCeoApprove(
  amount: number,
  fundsAvailable: boolean | null | undefined
): { next: ExpenseStatus; error?: string } {
  if (!requiresCeo(amount)) {
    return { next: "ceo_review", error: "CEO approval is only for ₹4L–₹4Cr expenses" };
  }
  if (fundsAvailable !== true) {
    return {
      next: "ceo_review",
      error: "Funds must be confirmed available before marking paid",
    };
  }
  return { next: "paid" };
}

export function amountBandLabel(amount: number): string {
  if (amount < THRESHOLD_LOW) return "Below ₹40,000 (no CEO)";
  if (amount < THRESHOLD_HIGH) return "₹40,000–₹4,00,000 (Finance, funds required)";
  if (amount <= THRESHOLD_CEO_MAX) return "₹4,00,000–₹4 Cr (CEO required)";
  return "Above ₹4 Cr (out of policy — escalate manually)";
}
