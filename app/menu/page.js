import MenuSearch from "@/components/MenuSearch";
import DeliveryPickupSelector from "@/components/DeliveryPickupSelector";
import FirstOrderBanner from "@/components/FirstOrderBanner";
import {
  preparedMeals,
  foodItems,
  burgersAndChicken,
  drinksAndDesserts,
  familyPacks,
  eventServices,
  mobileOfferings,
} from "@/lib/menu-data";

export const metadata = {
  title: "Menu",
  description:
    "Order prepared meals, burgers, chicken, drinks, and family meal packs from Susan G Enterprises, a mobile food service business in Southfield, Michigan.",
};

const categories = [
  { title: "Prepared Meals", note: "Individual Orders", items: preparedMeals },
  { title: "Burgers & Chicken", note: "Made to Order", items: burgersAndChicken },
  { title: "Food Items", note: "À La Carte", items: foodItems },
  { title: "Drinks & Desserts", note: "Add to Any Order", items: drinksAndDesserts },
  { title: "Family & Group Packs", note: "Feeds 4–6 People", items: familyPacks },
  { title: "Event Food Services", note: "Custom Packages — Contact for Quote", items: eventServices },
  { title: "Mobile Food Offerings", note: "How to Order", items: mobileOfferings },
];

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

      <section className="section--tight" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <FirstOrderBanner />
          <DeliveryPickupSelector />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <MenuSearch categories={categories} />

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
