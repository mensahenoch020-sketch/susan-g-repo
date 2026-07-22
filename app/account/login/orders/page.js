"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/menu-data";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrderHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

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

        {orders === null && !error && <p>Loading your orders…</p>}

        {orders && orders.length === 0 && (
          <div className="cart-drawer__empty" style={{ padding: "24px 0" }}>
            <p>You haven&rsquo;t placed any orders yet.</p>
            <Link href="/menu" className="btn btn--primary" style={{ marginTop: 12 }}>
              Browse the Menu
            </Link>
          </div>
        )}

        {orders && orders.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
            {orders.map((order) => (
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
