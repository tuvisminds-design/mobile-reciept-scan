import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expenseAction.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const ceo = await prisma.user.create({
    data: {
      name: "Priya CEO",
      email: "ceo@company.com",
      passwordHash,
      role: "ceo",
    },
  });

  const finance = await prisma.user.create({
    data: {
      name: "Asha Finance",
      email: "finance@company.com",
      passwordHash,
      role: "finance",
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Ravi Manager",
      email: "manager@company.com",
      passwordHash,
      role: "manager",
    },
  });

  const employee = await prisma.user.create({
    data: {
      name: "Neha Employee",
      email: "employee@company.com",
      passwordHash,
      role: "employee",
      managerId: manager.id,
    },
  });

  console.log("Seeded users (password for all: Password123!):");
  console.log({
    employee: employee.email,
    manager: manager.email,
    finance: finance.email,
    ceo: ceo.email,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
