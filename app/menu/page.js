import FoodVisual from "@/components/FoodVisual";

export const metadata = {
  title: "Menu",
  description:
    "Explore the menu at Susan G Enterprises, featuring prepared meals, food items, event food services, and mobile food offerings in Southfield, Michigan.",
};

/**
 * MENU DATA
 * ------------------------------------------------------------------
 * Edit the arrays below to update menu items, descriptions, and
 * prices. Each item includes a `visual` number (1-4) that controls
 * the placeholder color block — swap these for real photos by
 * updating the FoodVisual usage or replacing with a Next <Image>.
 * ------------------------------------------------------------------
 */
const preparedMeals = [
  {
    name: "Classic Plate Special",
    desc: "A hearty entrée served with two side options. Ask about today's rotating selection.",
    price: "$12.00",
    visual: 1,
  },
  {
    name: "Comfort Bowl",
    desc: "A warm, made-to-order bowl combining a protein, grain, and seasonal vegetables.",
    price: "$11.00",
    visual: 2,
  },
  {
    name: "Southfield Sandwich",
    desc: "Freshly prepared sandwich served on request with a side of your choice.",
    price: "$9.00",
    visual: 3,
  },
  {
    name: "Family-Style Meal Pack",
    desc: "A larger portion prepared meal designed to serve multiple people. Great for take-home orders.",
    price: "$32.00",
    visual: 4,
  },
];

const foodItems = [
  {
    name: "Seasoned Side",
    desc: "A freshly prepared side dish, rotating based on availability and season.",
    price: "$4.00",
    visual: 1,
  },
  {
    name: "Homestyle Snack",
    desc: "A quick, freshly made snack option for customers on the go.",
    price: "$5.00",
    visual: 2,
  },
  {
    name: "Fresh Beverage",
    desc: "A refreshing beverage option available to pair with any order.",
    price: "$2.50",
    visual: 3,
  },
  {
    name: "Sweet Treat",
    desc: "A freshly prepared dessert item, available while supplies last.",
    price: "$4.50",
    visual: 4,
  },
];

const eventServices = [
  {
    name: "Small Gathering Package",
    desc: "Mobile food service for smaller private gatherings. Menu and quantities customized to your event.",
    price: "Starting at $150",
    visual: 2,
  },
  {
    name: "Community Event Service",
    desc: "On-site mobile food service for community events, fundraisers, and public gatherings.",
    price: "Custom Quote",
    visual: 3,
  },
  {
    name: "Office / Group Order",
    desc: "Pre-arranged meal packages prepared for pickup or delivery to a group setting.",
    price: "Custom Quote",
    visual: 4,
  },
];

const mobileOfferings = [
  {
    name: "Walk-Up Service",
    desc: "Order and pay directly at our mobile service location during posted service hours.",
    price: "Menu Pricing",
    visual: 1,
  },
  {
    name: "Pre-Order Pickup",
    desc: "Contact us ahead of time to arrange a pickup order at a scheduled location and time.",
    price: "Menu Pricing",
    visual: 2,
  },
];

function MenuSection({ title, note, items }) {
  return (
    <div className="menu-category">
      <div className="menu-category__head">
        <h2>{title}</h2>
        {note && <span className="menu-category__note">{note}</span>}
      </div>
      <div className="menu-grid">
        {items.map((item) => (
          <div className="menu-item" key={item.name}>
            <div className="menu-item__visual">
              <FoodVisual variant={item.visual} label="Photo" />
            </div>
            <div className="menu-item__body">
              <div className="menu-item__top">
                <h3>{item.name}</h3>
                <span className="menu-item__price">{item.price}</span>
              </div>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Menu &amp; Services</span>
          <h1>What we&rsquo;re serving.</h1>
          <p>
            Below is a sample of the food and services offered by Susan G
            Enterprises. Availability, pricing, and daily offerings may vary
            — contact us for current selections and event quotes.
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
            title="Event Food Services"
            note="Custom Packages"
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
              This menu reflects sample offerings and placeholder pricing
              that can be updated at any time. For current availability,
              custom event menus, or to place an order, please{" "}
              <a href="/contact" style={{ color: "inherit", textDecoration: "underline" }}>
                contact us directly
              </a>
              . Payments are collected at the time of purchase through
              electronic payment and other accepted payment methods.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
