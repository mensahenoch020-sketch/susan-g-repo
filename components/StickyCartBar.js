"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";

export default function StickyCartBar() {
  const { itemCount, subtotal, setIsOpen, isOpen } = useCart();

  if (itemCount === 0 || isOpen) return null;

  return (
    <button className="sticky-cart-bar" onClick={() => setIsOpen(true)}>
      <span className="sticky-cart-bar__count">{itemCount}</span>
      <span className="sticky-cart-bar__label">
        {itemCount === 1 ? "1 item" : `${itemCount} items`} in cart
      </span>
      <span className="sticky-cart-bar__total">{formatPrice(subtotal)}</span>
      <span className="sticky-cart-bar__cta">View Cart</span>
    </button>
  );
}
