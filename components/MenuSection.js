"use client";

import { useState } from "react";
import Image from "next/image";
import FoodVisual from "@/components/FoodVisual";
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

export default function MenuSection({ title, note, items }) {
  const { addItem } = useCart();

  return (
    <div className="menu-category">
      <div className="menu-category__head">
        <h2>{title}</h2>
        {note && <span className="menu-category__note">{note}</span>}
      </div>
      <div className="menu-grid">
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
                <button
                  className="btn btn--outline menu-item__add"
                  onClick={() => addItem(item)}
                >
                  Add to Cart
                </button>
              ) : (
                <a href="/contact" className="btn btn--outline menu-item__add">
                  Request a Quote
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
