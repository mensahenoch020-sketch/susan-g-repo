import { NextResponse } from "next/server";
import Stripe from "stripe";
import { allPurchasableItems } from "@/lib/menu-data";
import siteConfig from "@/lib/site-config";

/**
 * POST /api/checkout
 * ------------------------------------------------------------------
 * Creates a Stripe Checkout Session from the cart items sent by the
 * browser. Prices are NEVER trusted from the client — every item id
 * is looked up against lib/menu-data.js on the server, so a customer
 * cannot tamper with prices in their browser.
 *
 * Requires the STRIPE_SECRET_KEY environment variable to be set
 * (see .env.example and README.md).
 * ------------------------------------------------------------------
 */
export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Payments are not yet configured on this site. Please contact the business directly to place your order.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const cartItems = Array.isArray(body?.items) ? body.items : [];

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Build Stripe line items using server-trusted product data only.
  const line_items = [];
  for (const cartItem of cartItems) {
    const product = allPurchasableItems.find((p) => p.id === cartItem.id);
    if (!product) {
      return NextResponse.json(
        { error: `One of the items in your cart is no longer available.` },
        { status: 400 }
      );
    }

    const quantity = Math.max(1, Math.min(50, parseInt(cartItem.quantity, 10) || 1));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.desc,
        },
        unit_amount: product.price,
      },
      quantity,
    });
  }

  try {
    const stripe = new Stripe(secretKey);

    const origin =
      request.headers.get("origin") || siteConfig.siteUrl || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/menu`,
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      metadata: {
        business: siteConfig.businessName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "We couldn't start checkout right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
