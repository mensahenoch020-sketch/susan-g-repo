import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

/**
 * POST /api/stripe-webhook
 * ------------------------------------------------------------------
 * Stripe calls this endpoint directly (server to server) when a
 * checkout session completes. This is the RELIABLE way to know a
 * payment succeeded — unlike the success redirect URL, which the
 * customer's browser might never load (closed tab, network issue,
 * etc). This webhook marks the matching Order as "paid" and, if the
 * order belonged to a logged-in user, marks their account as having
 * placed an order (so the first-order delivery fee waiver only ever
 * applies once).
 *
 * SETUP REQUIRED (see README.md):
 * 1. In your Stripe Dashboard, go to Developers -> Webhooks -> Add endpoint
 * 2. Endpoint URL: https://yourdomain.com/api/stripe-webhook
 * 3. Select event: checkout.session.completed
 * 4. Copy the "Signing secret" and add it to Railway as STRIPE_WEBHOOK_SECRET
 *
 * Until that's set up, orders will still work — they just won't be
 * automatically marked "paid" in the database, and the first-order
 * waiver won't reliably track across orders.
 * ------------------------------------------------------------------
 */
export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const order = await prisma.order.update({
        where: { stripeSessionId: session.id },
        data: { status: "paid" },
      });

      if (order.userId) {
        await prisma.user.update({
          where: { id: order.userId },
          data: { hasOrdered: true },
        });
      }
    } catch (err) {
      console.error("Failed to update order/user after payment:", err);
      // Don't fail the webhook response — Stripe will retry otherwise,
      // and the payment itself already succeeded regardless.
    }
  }

  return NextResponse.json({ received: true });
}
