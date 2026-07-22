import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      status: order.status,
      fulfillmentMethod: order.fulfillmentMethod,
      deliveryZip: order.deliveryZip,
      items: JSON.parse(order.itemsJson),
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      createdAt: order.createdAt,
    }));

    return NextResponse.json({ orders: formatted });
  } catch (err) {
    console.error("Order history fetch error:", err);
    return NextResponse.json(
      { error: "We couldn't load your order history right now." },
      { status: 500 }
    );
  }
}
