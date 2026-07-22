"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";

export default function StickyCartBar() {
  const { itemCount, subtotal, setIsOpen, isOpen } = useCart();
  const [bump, setBump] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount !== prevCount.current) {
      setBump(true);
      const timer = window.setTimeout(() => setBump(false), 350);
      prevCount.current = itemCount;
      return () => window.clearTimeout(timer);
    }
  }, [itemCount]);

  if (itemCount === 0 || isOpen) return null;

  return (
    <button className="sticky-cart-bar" onClick={() => setIsOpen(true)}>
      <span className={`sticky-cart-bar__count ${bump ? "sticky-cart-bar__count--bump" : ""}`}>
        {itemCount}
      </span>
      <span className="sticky-cart-bar__label">
        {itemCount === 1 ? "1 item" : `${itemCount} items`} in cart
      </span>
      <span className="sticky-cart-bar__total">{formatPrice(subtotal)}</span>
      <span className="sticky-cart-bar__cta">View Cart</span>
    </button>
  );
}
