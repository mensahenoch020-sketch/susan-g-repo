import { NextResponse } from "next/server";
import Stripe from "stripe";
import { allPurchasableItems } from "@/lib/menu-data";
import siteConfig from "@/lib/site-config";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

// Flat delivery fee, in cents. Edit this to change your delivery fee.
const DELIVERY_FEE_CENTS = 500; // $5.00

/**
 * POST /api/checkout
 * ------------------------------------------------------------------
 * Creates a Stripe Checkout Session from the cart items sent by the
 * browser. Prices are NEVER trusted from the client — every item id
 * is looked up against lib/menu-data.js on the server, so a customer
 * cannot tamper with prices in their browser.
 *
 * Also handles:
 * - Pickup vs delivery, including a flat delivery fee
 * - Waiving the delivery fee automatically for a logged-in customer's
 *   genuine first order (tracked via User.hasOrdered in the database)
 * - Validating the delivery zip code against the configured service area
 * - Creating a pending Order record, later marked "paid" by the
 *   success page once Stripe confirms the session
 *
 * Requires STRIPE_SECRET_KEY and DATABASE_URL environment variables
 * to be set (see .env.example and README.md). If DATABASE_URL isn't
 * set yet, checkout still works — order history and the first-order
 * waiver just won't be available until a database is connected.
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
  const fulfillmentMethod = body?.fulfillmentMethod === "delivery" ? "delivery" : "pickup";
  const deliveryZip = (body?.deliveryZip || "").trim();

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  if (fulfillmentMethod === "delivery") {
    if (!/^\d{5}$/.test(deliveryZip)) {
      return NextResponse.json(
        { error: "Please enter a valid delivery zip code." },
        { status: 400 }
      );
    }
    if (!siteConfig.deliveryZips.includes(deliveryZip)) {
      return NextResponse.json(
        { error: `Sorry, we don't currently deliver to ${deliveryZip}.` },
        { status: 400 }
      );
    }
  }

  // Build Stripe line items using server-trusted product data only.
  const line_items = [];
  const orderItemsForRecord = [];
  let subtotal = 0;

  for (const cartItem of cartItems) {
    const product = allPurchasableItems.find((p) => p.id === cartItem.id);
    if (!product) {
      return NextResponse.json(
        { error: `One of the items in your cart is no longer available.` },
        { status: 400 }
      );
    }

    const quantity = Math.max(1, Math.min(50, parseInt(cartItem.quantity, 10) || 1));
    const note = typeof cartItem.note === "string" ? cartItem.note.trim().slice(0, 200) : "";
    subtotal += product.price * quantity;

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: note ? `${product.desc} — Note: ${note}` : product.desc,
        },
        unit_amount: product.price,
      },
      quantity,
    });

    orderItemsForRecord.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      note: note || undefined,
    });
  }

  // Determine delivery fee, checking for a genuine first-order waiver.
  let deliveryFee = 0;
  let currentUser = null;
  if (fulfillmentMethod === "delivery") {
    deliveryFee = DELIVERY_FEE_CENTS;
    try {
      currentUser = await getCurrentUser();
      if (currentUser && !currentUser.hasOrdered) {
        deliveryFee = 0; // first-order delivery fee waiver
      }
    } catch (err) {
      // If the database isn't connected yet, just charge the normal fee.
      console.error("First-order waiver check failed:", err);
    }

    if (deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Delivery Fee" },
          unit_amount: deliveryFee,
        },
        quantity: 1,
      });
    } else if (currentUser && !currentUser.hasOrdered) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Fee (Waived — First Order)",
          },
          unit_amount: 0,
        },
        quantity: 1,
      });
    }
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
        fulfillmentMethod,
        deliveryZip: deliveryZip || "",
      },
    });

    // Save a pending order record, if the database is connected.
    try {
      await prisma.order.create({
        data: {
          userId: currentUser?.id || null,
          stripeSessionId: session.id,
          status: "pending",
          fulfillmentMethod,
          deliveryZip: deliveryZip || null,
          itemsJson: JSON.stringify(orderItemsForRecord),
          subtotal,
          deliveryFee,
          total: subtotal + deliveryFee,
        },
      });
    } catch (err) {
      // Database not connected yet, or another persistence issue —
      // checkout should still proceed even if we can't save history.
      console.error("Order record creation failed:", err);
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "We couldn't start checkout right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
