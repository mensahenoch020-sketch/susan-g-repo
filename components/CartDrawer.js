"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateNote,
    subtotal,
    isOpen,
    setIsOpen,
    fulfillmentMethod,
    deliveryZip,
  } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  const deliveryNotReady = fulfillmentMethod === "delivery" && !deliveryZip;

  async function handleCheckout() {
    setError("");

    if (deliveryNotReady) {
      setError(
        "Please confirm a valid delivery zip code on the Menu page before checking out, or switch to Pickup."
      );
      return;
    }

    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            quantity: i.quantity,
            note: i.note || "",
          })),
          fulfillmentMethod,
          deliveryZip: fulfillmentMethod === "delivery" ? deliveryZip : "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Something went wrong starting checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Unable to start checkout. Please try again.");
      setCheckingOut(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsOpen(false)}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="cart-drawer__head">
          <h2>Your Order</h2>
          <button
            className="cart-drawer__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty.</p>
            <p style={{ fontSize: "0.9rem" }}>
              Browse the menu and add items to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__mode-note">
              {fulfillmentMethod === "delivery" ? (
                deliveryZip ? (
                  <span>Delivery to {deliveryZip}</span>
                ) : (
                  <span className="cart-drawer__mode-note--warn">
                    Delivery selected — confirm your zip code on the Menu page
                  </span>
                )
              ) : (
                <span>Pickup order</span>
              )}
            </div>

            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li className="cart-drawer__item" key={item.id}>
                  <div className="cart-drawer__item-info">
                    <span className="cart-drawer__item-name">{item.name}</span>
                    <span className="cart-drawer__item-price">
                      {formatPrice(item.price)} each
                    </span>
                  </div>
                  <div className="cart-drawer__item-controls">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      &minus;
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-drawer__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    className="cart-drawer__note"
                    placeholder="Add a note (e.g. no onions)"
                    maxLength={200}
                    value={item.note || ""}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                    aria-label={`Special instructions for ${item.name}`}
                  />
                </li>
              ))}
            </ul>

            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {fulfillmentMethod === "delivery" && (
              <p className="form-note" style={{ marginTop: -8, marginBottom: 12 }}>
                Delivery fee (if applicable) is calculated at checkout.
              </p>
            )}

            {error && (
              <p style={{ color: "var(--color-tomato)", fontSize: "0.88rem" }}>{error}</p>
            )}

            <button
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? "Redirecting to secure checkout…" : "Checkout with Stripe"}
            </button>
            <p className="form-note" style={{ marginTop: 10, textAlign: "center" }}>
              Payment is processed securely by Stripe. You&rsquo;ll be
              redirected to complete your purchase.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
