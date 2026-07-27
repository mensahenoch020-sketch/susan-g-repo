import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true, name: true } } },
    });

    const paidOrders = orders.filter((o) => o.status === "paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(
      orders.filter((o) => o.userId).map((o) => o.userId)
    ).size;

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
      customerEmail: order.user?.email || "Guest",
      customerName: order.user?.name || null,
    }));

    return NextResponse.json({
      orders: formatted,
      stats: {
        totalRevenue,
        totalOrders,
        paidOrders: paidOrders.length,
        uniqueCustomers,
      },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Could not load admin data." }, { status: 500 });
  }
}
