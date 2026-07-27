"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/menu-data";

const STAGES = [
  { key: "pending", label: "Order Placed" },
  { key: "paid", label: "Payment Confirmed" },
];

function stageIndex(status) {
  const idx = STAGES.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/lookup?session_id=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        throw new Error(data.error || "Order not found.");
      }
      setOrder(data.order);
    } catch (err) {
      setError(err.message || "We couldn't find that order.");
    } finally {
      setLoading(false);
    }
  }

  const currentStage = order ? stageIndex(order.status === "paid" ? "paid" : order.status) : 0;

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 560 }}>
        <span className="eyebrow">Track Order</span>
        <h1 style={{ marginTop: 12 }}>Check your order status.</h1>
        <p style={{ color: "rgba(32,27,23,0.7)", marginBottom: 24 }}>
          Enter your order confirmation ID (from your receipt or confirmation
          email) to check its current status.
        </p>

        <form className="form" onSubmit={handleTrack} style={{ marginBottom: 24 }}>
          <div className="field">
            <label htmlFor="order-id">Order Confirmation ID</label>
            <input
              id="order-id"
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. cs_test_..."
            />
            <span className="form-note">
              This is the Stripe checkout session ID from your order
              confirmation link.
            </span>
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Checking…" : "Track Order"}
          </button>
        </form>

        {error && <p style={{ color: "var(--color-tomato)" }}>{error}</p>}

        {order && (
          <div className="receipt">
            <div className="receipt__head">
              <span>Order #{order.id.slice(-8).toUpperCase()}</span>
              <span className={`order-status order-status--${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="tracking-stages">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.key}
                  className={`tracking-stage ${idx <= currentStage ? "tracking-stage--done" : ""}`}
                >
                  <span className="tracking-stage__dot" />
                  <span className="tracking-stage__label">{stage.label}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.85rem", color: "rgba(32,27,23,0.55)", marginTop: 16 }}>
              {order.fulfillmentMethod === "delivery"
                ? `Delivery to ${order.deliveryZip || "—"}`
                : "Pickup order"}{" "}
              &middot; Total {formatPrice(order.total)}
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(32,27,23,0.5)" }}>
              For the most current status on same-day orders, feel free to
              contact us directly — this page reflects payment and order
              status, not live location tracking.
            </p>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Link href="/account/orders" className="btn btn--outline">
            View Full Order History
          </Link>
        </div>
      </div>
    </section>
  );
}
