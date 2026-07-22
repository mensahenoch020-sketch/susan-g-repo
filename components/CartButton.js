"use client";

import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <button
      className="cart-button"
      onClick={() => setIsOpen(true)}
      aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>
      {itemCount > 0 && <span className="cart-button__badge">{itemCount}</span>}
    </button>
  );
}
