# ReceiptScan Expense

Responsive **React 19** + **Node.js (Express)** employee expense reimbursement app for mobile and desktop browsers. Employees submit expenses with receipt photos/files; managers, finance, and CEO approve by amount band.

Repository: https://github.com/tuvisminds-design/mobile-reciept-scan

## Features

- Employee expense form with camera capture (mobile) or file upload (desktop)
- Workflow: Employee → Manager → Finance → (CEO if ₹4L–₹4 Cr) → Paid
- Amount policy (INR):
  - **&lt; ₹40,000** — Manager → Finance → Paid
  - **₹40,000–₹4,00,000** — Finance must confirm funds available
  - **₹4,00,000–₹4 Cr** — CEO approval required + funds
- Role-based inboxes and JWT auth
- Email notifications via Nodemailer (logged to console when SMTP is disabled)

## Stack

| Layer | Tech |
|-------|------|
| UI | React 19, Vite, TypeScript, React Router |
| API | Node.js, Express 5, TypeScript |
| DB | Prisma 6 + SQLite |
| Auth | JWT + bcrypt |
| Files | Multer (`server/uploads`) |

## Quick start

Requirements: **Node.js 20+** (tested on Node 24).

```bash
# From repo root
npm run setup

# Terminal 1 — API (http://localhost:4000)
npm run dev:server

# Terminal 2 — UI (http://localhost:5173)
npm run dev:client
```

Open http://localhost:5173 and sign in with a demo user.

### Demo users

Password for all: `Password123!`

| Role | Email |
|------|-------|
| Employee | employee@company.com |
| Manager | manager@company.com |
| Finance | finance@company.com |
| CEO | ceo@company.com |

## Environment

Copy values from `server/.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"
MAIL_ENABLED=false
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Expense App <noreply@example.com>"
```

Set `MAIL_ENABLED=true` and SMTP fields to send real emails.

Optional client env (`client/.env`):

```env
VITE_API_URL=http://localhost:4000
```

## API

- `POST /api/auth/login` — `{ email, password }`
- `GET /api/auth/me`
- `POST /api/expenses` — multipart: `amount`, `purpose`, `category`, `receipt`
- `GET /api/expenses?scope=mine|inbox`
- `GET /api/expenses/:id`
- `POST /api/expenses/:id/decision` — `{ action: "approve"|"reject", comment?, fundsAvailable? }`
- `GET /api/expenses/receipt/:filename?token=...`

## Project layout

```
client/   React UI
server/   Express API, Prisma, uploads
```

## Functional requirements covered

- **FR-001** — Employee submits form; manager + finance notified
- **FR-002 / FR-003** — Manager reviews and approve/reject
- **FR-004 / FR-005** — Finance reviews and approve/reject
- **Example rule** — CEO gate for ₹4L–₹4 Cr
