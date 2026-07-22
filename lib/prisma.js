import { PrismaClient } from "@prisma/client";

// Standard Next.js pattern: reuse a single PrismaClient instance across
// hot reloads in development to avoid exhausting database connections.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
