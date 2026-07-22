import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Server-side helper: returns the currently logged-in user (or null),
 * for use in Server Components and API routes. Reads the session
 * cookie directly — safe to call from server code only.
 */
export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const userId = verifySessionToken(token);
  if (!userId) return null;

  try {
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
