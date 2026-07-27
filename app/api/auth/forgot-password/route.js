import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body?.email || "").trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Please enter your email address." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Always respond the same way whether or not the account exists —
    // this avoids leaking which emails have accounts.
    const genericResponse = {
      message:
        "If an account exists for that email, a password reset link has been generated.",
    };

    if (!user) {
      return NextResponse.json(genericResponse);
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + RESET_TOKEN_DURATION_MS);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpires: expires },
    });

    // NOTE: Email sending isn't set up yet (see README). Until it is,
    // the reset link is returned directly in the response so it can be
    // shown on-screen and shared with the customer manually (e.g. by
    // the business owner via text/email). Once a real email service is
    // connected, this should be emailed instead of returned here.
    const origin = request.headers.get("origin") || "";
    const resetUrl = `${origin}/account/reset-password?token=${token}`;

    return NextResponse.json({ ...genericResponse, resetUrl });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
