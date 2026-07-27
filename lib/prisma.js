import { PrismaClient } from "@prisma/client";

// Standard Next.js pattern: reuse a single PrismaClient instance across
// hot reloads in development to avoid exhausting database connections.
//
// IMPORTANT: PrismaClient's constructor can throw immediately if
// DATABASE_URL isn't set — which would crash any route that imports
// this file at all, even routes that don't end up using the database
// (e.g. a Pickup order that never touches Order/User tables). To keep
// the rest of the site working before a database is connected, we only
// construct the client lazily, the first time it's actually used, and
// every caller in this app wraps database calls in try/catch already.
const globalForPrisma = globalThis;

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// A Proxy defers actually calling `new PrismaClient()` until the first
// time a property (e.g. `.user.findUnique`) is accessed, rather than at
// import time — so simply importing this file can never crash a route.
export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      return getPrisma()[prop];
    },
  }
);

export default prisma;
