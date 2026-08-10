import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import type { ExpenseStatus, Role } from "@prisma/client";
import { prisma } from "../prisma/client.js";
import { requireAuth, type AuthUser } from "../middleware/auth.js";
import { sendMail } from "../services/mailer.js";
import {
  amountBandLabel,
  nextStatusAfterCeoApprove,
  nextStatusAfterFinanceApprove,
  requiresCeo,
} from "../services/amount-policy.js";

const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)|application\/pdf/.test(file.mimetype);
    cb(ok ? null : new Error("Only images and PDF receipts are allowed"), ok);
  },
});

export const expensesRouter = Router();

function authFromHeaderOrQuery(req: Request, res: Response, next: NextFunction): void {
  if (req.headers.authorization?.startsWith("Bearer ")) {
    requireAuth(req, res, next);
    return;
  }
  const token = typeof req.query.token === "string" ? req.query.token : "";
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret || !token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = jwt.verify(token, secret) as AuthUser;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

function serializeExpense(expense: {
  id: string;
  amount: number;
  currency: string;
  purpose: string;
  category: string;
  status: ExpenseStatus;
  receiptPath: string | null;
  fundsAvailable: boolean | null;
  submittedById: string;
  createdAt: Date;
  updatedAt: Date;
  submittedBy?: { id: string; name: string; email: string; role: Role };
  actions?: Array<{
    id: string;
    action: string;
    comment: string | null;
    createdAt: Date;
    actor: { id: string; name: string; role: Role };
  }>;
}) {
  return {
    ...expense,
    amountBand: amountBandLabel(expense.amount),
    requiresCeo: requiresCeo(expense.amount),
    receiptUrl: expense.receiptPath
      ? `/api/expenses/receipt/${path.basename(expense.receiptPath)}`
      : null,
  };
}

expensesRouter.post("/", requireAuth, upload.single("receipt"), async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const purpose = String(req.body.purpose || "").trim();
    const category = String(req.body.category || "").trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      res.status(400).json({ error: "Valid amount is required" });
      return;
    }
    if (!purpose || !category) {
      res.status(400).json({ error: "Purpose and category are required" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "Receipt file is required" });
      return;
    }

    const submitter = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { manager: true },
    });
    if (!submitter) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        purpose,
        category,
        status: "manager_review",
        receiptPath: req.file.filename,
        submittedById: submitter.id,
        actions: {
          create: {
            actorId: submitter.id,
            action: "submitted",
            comment: "Expense submitted for manager review",
          },
        },
      },
      include: {
        submittedBy: { select: { id: true, name: true, email: true, role: true } },
        actions: {
          include: { actor: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const financeUsers = await prisma.user.findMany({ where: { role: "finance" } });
    const notifyEmails: string[] = financeUsers.map((u) => u.email);
    if (submitter.manager?.email) notifyEmails.push(submitter.manager.email);

    await sendMail({
      to: [...new Set(notifyEmails)],
      subject: `New expense submitted: ${purpose}`,
      text: `${submitter.name} submitted an expense of ₹${amount.toLocaleString("en-IN")} (${category}). Status: manager_review. Band: ${amountBandLabel(amount)}.`,
    });

    res.status(201).json({ expense: serializeExpense(expense) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create expense";
    res.status(400).json({ error: message });
  }
});

expensesRouter.get("/", requireAuth, async (req, res) => {
  const scope = String(req.query.scope || "auto");
  const role = req.user!.role;
  const userId = req.user!.id;

  let where: Record<string, unknown> = {};

  if (scope === "mine" || (scope === "auto" && role === "employee")) {
    where = { submittedById: userId };
  } else if (scope === "inbox" || scope === "auto") {
    if (role === "manager") {
      const reports = await prisma.user.findMany({
        where: { managerId: userId },
        select: { id: true },
      });
      const reportIds = reports.map((r) => r.id);
      where = {
        status: "manager_review",
        submittedById: { in: reportIds.length ? reportIds : ["__none__"] },
      };
    } else if (role === "finance") {
      where = { status: "finance_review" };
    } else if (role === "ceo") {
      where = { status: "ceo_review" };
    } else {
      where = { submittedById: userId };
    }
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      submittedBy: { select: { id: true, name: true, email: true, role: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({ expenses: expenses.map(serializeExpense) });
});

expensesRouter.get("/receipt/:filename", authFromHeaderOrQuery, async (req, res) => {
  const filename = path.basename(req.params.filename);
  const full = path.join(uploadDir, filename);
  if (!fs.existsSync(full)) {
    res.status(404).json({ error: "Receipt not found" });
    return;
  }
  res.sendFile(full);
});

expensesRouter.get("/:id", requireAuth, async (req, res) => {
  const expense = await prisma.expense.findUnique({
    where: { id: req.params.id },
    include: {
      submittedBy: { select: { id: true, name: true, email: true, role: true } },
      actions: {
        include: { actor: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  const role = req.user!.role;
  const isOwner = expense.submittedById === req.user!.id;
  const canReview =
    (role === "manager" && expense.status === "manager_review") ||
    (role === "finance" && expense.status === "finance_review") ||
    (role === "ceo" && expense.status === "ceo_review");

  if (!isOwner && !canReview && role !== "finance" && role !== "ceo" && role !== "manager") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  res.json({ expense: serializeExpense(expense) });
});

expensesRouter.post("/:id/decision", requireAuth, async (req, res) => {
  const { action, comment, fundsAvailable } = req.body as {
    action?: "approve" | "reject";
    comment?: string;
    fundsAvailable?: boolean;
  };

  if (action !== "approve" && action !== "reject") {
    res.status(400).json({ error: "action must be approve or reject" });
    return;
  }

  const expense = await prisma.expense.findUnique({
    where: { id: req.params.id },
    include: {
      submittedBy: { include: { manager: true } },
    },
  });
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  const role = req.user!.role;
  let nextStatus: ExpenseStatus | null = null;
  let fundsValue = expense.fundsAvailable;

  if (action === "reject") {
    if (
      (role === "manager" && expense.status === "manager_review") ||
      (role === "finance" && expense.status === "finance_review") ||
      (role === "ceo" && expense.status === "ceo_review")
    ) {
      nextStatus = "rejected";
    } else {
      res.status(403).json({ error: "You cannot reject this expense in its current state" });
      return;
    }
  } else if (role === "manager" && expense.status === "manager_review") {
    if (expense.submittedBy.managerId && expense.submittedBy.managerId !== req.user!.id) {
      res.status(403).json({ error: "Not the assigned manager for this employee" });
      return;
    }
    nextStatus = "finance_review";
  } else if (role === "finance" && expense.status === "finance_review") {
    if (typeof fundsAvailable === "boolean") {
      fundsValue = fundsAvailable;
    }
    const result = nextStatusAfterFinanceApprove(expense.amount, fundsValue);
    if (result.error && result.next === "finance_review") {
      res.status(400).json({ error: result.error });
      return;
    }
    nextStatus = result.next;
  } else if (role === "ceo" && expense.status === "ceo_review") {
    if (typeof fundsAvailable === "boolean") {
      fundsValue = fundsAvailable;
    }
    const result = nextStatusAfterCeoApprove(expense.amount, fundsValue);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    nextStatus = result.next;
  } else {
    res.status(403).json({ error: "You cannot approve this expense in its current state" });
    return;
  }

  const updated = await prisma.expense.update({
    where: { id: expense.id },
    data: {
      status: nextStatus!,
      fundsAvailable: fundsValue,
      actions: {
        create: {
          actorId: req.user!.id,
          action: `${role}_${action}`,
          comment: comment || null,
        },
      },
    },
    include: {
      submittedBy: { select: { id: true, name: true, email: true, role: true } },
      actions: {
        include: { actor: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const notifyTo: string[] = [expense.submittedBy.email];
  if (nextStatus === "finance_review") {
    const financeUsers = await prisma.user.findMany({ where: { role: "finance" } });
    notifyTo.push(...financeUsers.map((u) => u.email));
  }
  if (nextStatus === "ceo_review") {
    const ceos = await prisma.user.findMany({ where: { role: "ceo" } });
    notifyTo.push(...ceos.map((u) => u.email));
  }

  await sendMail({
    to: [...new Set(notifyTo)],
    subject: `Expense ${action}d — now ${nextStatus}`,
    text: `Expense "${expense.purpose}" (₹${expense.amount.toLocaleString("en-IN")}) was ${action}d by ${req.user!.name} (${role}). New status: ${nextStatus}.`,
  });

  res.json({ expense: serializeExpense(updated) });
});
