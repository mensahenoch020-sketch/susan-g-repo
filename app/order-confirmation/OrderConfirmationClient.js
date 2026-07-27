"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import siteConfig from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OrderConfirmationClient() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/orders/lookup?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap" style={{ maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Order Confirmed
        </span>
        <h1 style={{ marginTop: 12 }}>Thank you for your order!</h1>
        <p style={{ color: "rgba(32,27,23,0.72)", fontSize: "1.05rem" }}>
          Your payment was successful. We&rsquo;ve received your order and
          will be in touch shortly with pickup or delivery details.
        </p>

        {loading && (
          <p style={{ color: "rgba(32,27,23,0.55)", fontSize: "0.9rem" }}>
            Loading your receipt…
          </p>
        )}

        {!loading && order && (
          <div className="receipt">
            <div className="receipt__head">
              <span>Order #{order.id.slice(-8).toUpperCase()}</span>
              <span className={`order-status order-status--${order.status}`}>
                {order.status}
              </span>
            </div>
            <p className="receipt__meta">{formatDate(order.createdAt)}</p>
            <p className="receipt__meta">
              {order.fulfillmentMethod === "delivery"
                ? `Delivery to ${order.deliveryZip || "—"}`
                : "Pickup"}
            </p>

            <ul className="receipt__items">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <span>
                    {item.quantity}&times; {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                  {item.note && <span className="receipt__note">Note: {item.note}</span>}
                </li>
              ))}
            </ul>

            <div className="receipt__totals">
              <div>
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.fulfillmentMethod === "delivery" && (
                <div>
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? "Waived" : formatPrice(order.deliveryFee)}</span>
                </div>
              )}
              <div className="receipt__total-final">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        )}

        {!loading && !order && sessionId && (
          <p style={{ color: "rgba(32,27,23,0.55)", fontSize: "0.9rem" }}>
            We couldn&rsquo;t load your receipt details, but your payment
            was successful — check your email for a Stripe confirmation, or
            contact us with any questions.
          </p>
        )}

        <p style={{ color: "rgba(32,27,23,0.72)", marginTop: 20 }}>
          If you have any questions about your order, contact us anytime at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
          <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/" className="btn btn--dark">
            Back to Home
          </Link>
          <Link href="/menu" className="btn btn--outline">
            Order Again
          </Link>
        </div>
      </div>
    </section>
  );
}
