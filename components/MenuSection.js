"use client";

import { useState } from "react";
import Image from "next/image";
import FoodVisual from "@/components/FoodVisual";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/menu-data";

function MenuItemVisual({ item }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return <FoodVisual variant={item.visual} label="Photo" />;
  }

  return (
    <Image
      src={item.image}
      alt={item.name}
      width={120}
      height={120}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
      onError={() => setFailed(true)}
    />
  );
}

function AddToCartButton({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <button
      className={`btn btn--outline menu-item__add ${justAdded ? "menu-item__add--added" : ""}`}
      onClick={handleClick}
    >
      {justAdded ? (
        <>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Added
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}

export default function MenuSection({ title, note, items }) {
  return (
    <div className="menu-category">
      <div className="menu-category__head">
        <h2>{title}</h2>
        {note && <span className="menu-category__note">{note}</span>}
      </div>
      <ScrollReveal className="menu-grid">
        {items.map((item) => (
          <div className="menu-item" key={item.id}>
            <div className="menu-item__visual">
              <MenuItemVisual item={item} />
            </div>
            <div className="menu-item__body">
              <div className="menu-item__top">
                <h3>{item.name}</h3>
                <span className="menu-item__price">
                  {item.purchasable ? formatPrice(item.price) : item.priceLabel}
                </span>
              </div>
              <p>{item.desc}</p>
              {item.purchasable ? (
                <AddToCartButton item={item} />
              ) : (
                <a href="/contact" className="btn btn--outline menu-item__add">
                  Request a Quote
                </a>
              )}
            </div>
          </div>
        ))}
      </ScrollReveal>
    </div>
  );
}
