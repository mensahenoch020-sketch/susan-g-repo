import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        fulfillmentMethod: order.fulfillmentMethod,
        deliveryZip: order.deliveryZip,
        items: JSON.parse(order.itemsJson),
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    console.error("Order lookup error:", err);
    return NextResponse.json({ error: "Could not load order details." }, { status: 500 });
  }
}
