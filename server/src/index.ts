import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { authRouter } from "./routes/auth.js";
import { expensesRouter } from "./routes/expenses.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "expense-reimbursement-api" });
});

app.use("/api/auth", authRouter);
app.use("/api/expenses", expensesRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(400).json({ error: err.message || "Request failed" });
  }
);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
