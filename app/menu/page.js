import MenuSection from "@/components/MenuSection";
import {
  preparedMeals,
  foodItems,
  familyPacks,
  eventServices,
  mobileOfferings,
} from "@/lib/menu-data";

export const metadata = {
  title: "Menu",
  description:
    "Order prepared meals, food items, and family meal packs from Susan G Enterprises, a mobile food service business in Southfield, Michigan.",
};

export default function MenuPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Menu &amp; Services</span>
          <h1>What we&rsquo;re serving.</h1>
          <p>
            Browse our menu below and add items to your cart to check out
            securely online. Availability and pricing may vary — contact us
            for event quotes or custom orders.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <MenuSection
            title="Prepared Meals"
            note="Individual Orders"
            items={preparedMeals}
          />
          <MenuSection
            title="Food Items"
            note="À La Carte"
            items={foodItems}
          />
          <MenuSection
            title="Family & Group Packs"
            note="Feeds 4–6 People"
            items={familyPacks}
          />
          <MenuSection
            title="Event Food Services"
            note="Custom Packages — Contact for Quote"
            items={eventServices}
          />
          <MenuSection
            title="Mobile Food Offerings"
            note="How to Order"
            items={mobileOfferings}
          />

          <div className="menu-note-box">
            <h3>Menu items and pricing are subject to change.</h3>
            <p>
              This menu reflects sample offerings that can be updated at any
              time. For event quotes, custom orders, or questions about a
              specific item, please{" "}
              <a href="/contact" style={{ color: "inherit", textDecoration: "underline" }}>
                contact us directly
              </a>
              . Online orders are processed securely through Stripe.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
