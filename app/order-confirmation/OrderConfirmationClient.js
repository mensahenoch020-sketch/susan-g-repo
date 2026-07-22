"use client";

import Link from "next/link";
import { useEffect } from "react";
import siteConfig from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";

export default function OrderConfirmationClient() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <p style={{ color: "rgba(32,27,23,0.72)" }}>
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
