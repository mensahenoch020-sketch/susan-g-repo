"use client";

import { useState } from "react";
import siteConfig from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";

export default function DeliveryPickupSelector() {
  const { fulfillmentMethod, setFulfillmentMethod, deliveryZip, setDeliveryZip } = useCart();
  const [zipInput, setZipInput] = useState(deliveryZip || "");
  const [result, setResult] = useState(null); // null | "in-range" | "out-of-range" | "invalid"

  function checkZip(e) {
    e.preventDefault();
    const cleaned = zipInput.trim();

    if (!/^\d{5}$/.test(cleaned)) {
      setResult("invalid");
      setDeliveryZip("");
      return;
    }

    if (siteConfig.deliveryZips.includes(cleaned)) {
      setResult("in-range");
      setDeliveryZip(cleaned);
    } else {
      setResult("out-of-range");
      setDeliveryZip("");
    }
  }

  return (
    <div className="order-mode">
      <div className="order-mode__toggle" role="tablist" aria-label="Pickup or delivery">
        <button
          role="tab"
          aria-selected={fulfillmentMethod === "pickup"}
          className={fulfillmentMethod === "pickup" ? "is-active" : ""}
          onClick={() => setFulfillmentMethod("pickup")}
        >
          Pickup
        </button>
        <button
          role="tab"
          aria-selected={fulfillmentMethod === "delivery"}
          className={fulfillmentMethod === "delivery" ? "is-active" : ""}
          onClick={() => setFulfillmentMethod("delivery")}
        >
          Delivery
        </button>
      </div>

      {fulfillmentMethod === "pickup" ? (
        <p className="order-mode__note">
          Pick up your order directly from our mobile service location.
          We&rsquo;ll confirm pickup details after checkout or by contacting
          us directly.
        </p>
      ) : (
        <div className="order-mode__delivery">
          <form className="zip-check" onSubmit={checkZip}>
            <label htmlFor="zip-check-input">Enter your zip code to check delivery availability</label>
            <div className="zip-check__row">
              <input
                id="zip-check-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="e.g. 48075"
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value.replace(/\D/g, ""));
                  setResult(null);
                }}
              />
              <button type="submit" className="btn btn--dark">
                Check
              </button>
            </div>
          </form>

          {result === "invalid" && (
            <p className="zip-check__result zip-check__result--warn">
              Please enter a valid 5-digit zip code.
            </p>
          )}
          {result === "in-range" && (
            <p className="zip-check__result zip-check__result--good">
              Great news — we deliver to {zipInput}. A $5 delivery fee applies
              (waived on your first order with an account — see Sign Up).
            </p>
          )}
          {result === "out-of-range" && (
            <p className="zip-check__result zip-check__result--warn">
              We don&rsquo;t currently deliver to {zipInput}. We serve{" "}
              {siteConfig.serviceArea}. Contact us to ask about your specific
              location, or choose Pickup instead.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
