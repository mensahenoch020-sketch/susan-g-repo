import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
} from "@/lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body?.email || "").trim().toLowerCase();
  const password = body?.password || "";

  if (!email || !password) {
    return NextResponse.json({ error: "Please enter your email and password." }, { status: 400 });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    // Generic error message on purpose — doesn't reveal whether the
    // email exists, which is a basic account-enumeration protection.
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }

    // Sync admin status against the ADMIN_EMAILS env var on every login.
    const shouldBeAdmin = isAdminEmail(user.email);
    if (shouldBeAdmin !== user.isAdmin) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isAdmin: shouldBeAdmin },
      });
    }

    const token = createSessionToken(user.id);
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000,
    });

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "We couldn't log you in right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
