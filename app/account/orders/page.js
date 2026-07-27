"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice, allPurchasableItems } from "@/lib/menu-data";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const FILTERS = [
  { value: "all", label: "All Orders" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export default function OrderHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [reorderNotice, setReorderNotice] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrders(data.orders);
        }
      })
      .catch(() => setError("We couldn't load your order history right now."));
  }, [user, authLoading]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  function handleReorder(order) {
    let addedCount = 0;
    let skippedCount = 0;

    order.items.forEach((item) => {
      // Look up the CURRENT product by id, so reorder always uses
      // today's real price/availability rather than a stale price
      // saved on the old order.
      const currentProduct = allPurchasableItems.find((p) => p.id === item.id);
      if (currentProduct) {
        addItem(currentProduct, item.quantity);
        addedCount += 1;
      } else {
        skippedCount += 1;
      }
    });

    if (addedCount > 0) {
      setReorderNotice(
        skippedCount > 0
          ? `Added ${addedCount} item(s) to your cart. ${skippedCount} item(s) from this order are no longer available.`
          : `Added ${addedCount} item(s) to your cart.`
      );
      window.setTimeout(() => router.push("/menu"), 1200);
    } else {
      setReorderNotice("Sorry, none of the items from this order are currently available.");
    }
  }

  if (authLoading) {
    return (
      <section className="section">
        <div className="wrap">
          <p>Loading…</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 480 }}>
          <span className="eyebrow">Order History</span>
          <h1 style={{ marginTop: 12 }}>Log in to view your orders.</h1>
          <p style={{ color: "rgba(32,27,23,0.7)", marginBottom: 24 }}>
            You need an account to see your order history.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/account/login" className="btn btn--primary">
              Log In
            </Link>
            <Link href="/account/signup" className="btn btn--outline">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <span className="eyebrow">Your Account</span>
        <h1 style={{ marginTop: 12 }}>Order history.</h1>

        {error && <p style={{ color: "var(--color-tomato)" }}>{error}</p>}
        {reorderNotice && (
          <p style={{ color: "var(--color-basil)", fontWeight: 600, fontSize: "0.92rem" }}>
            {reorderNotice}
          </p>
        )}

        {orders === null && !error && <p>Loading your orders…</p>}

        {orders && orders.length > 0 && (
          <div className="order-filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={filter === f.value ? "is-active" : ""}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {orders && orders.length === 0 && (
          <div className="cart-drawer__empty" style={{ padding: "24px 0" }}>
            <p>You haven&rsquo;t placed any orders yet.</p>
            <Link href="/menu" className="btn btn--primary" style={{ marginTop: 12 }}>
              Browse the Menu
            </Link>
          </div>
        )}

        {orders && orders.length > 0 && filteredOrders.length === 0 && (
          <p style={{ color: "rgba(32,27,23,0.6)", marginTop: 20 }}>
            No orders match this filter.
          </p>
        )}

        {filteredOrders.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
            {filteredOrders.map((order) => (
              <li key={order.id} className="order-history-item">
                <div className="order-history-item__head">
                  <div>
                    <strong>{formatDate(order.createdAt)}</strong>
                    <span className={`order-status order-status--${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="order-history-item__total">{formatPrice(order.total)}</span>
                </div>
                <p className="order-history-item__meta">
                  {order.fulfillmentMethod === "delivery"
                    ? `Delivery to ${order.deliveryZip || "—"}`
                    : "Pickup"}
                </p>
                <ul className="order-history-item__list">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity}&times; {item.name}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn--outline"
                  style={{ marginTop: 14, padding: "8px 16px", fontSize: "0.85rem" }}
                  onClick={() => handleReorder(order)}
                >
                  Reorder
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
