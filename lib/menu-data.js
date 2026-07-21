/**
 * MENU / PRODUCT DATA
 * ------------------------------------------------------------------
 * This is the single source of truth for every purchasable item on
 * the site — the Menu page, the cart, and Stripe Checkout all read
 * from this file. Edit names, descriptions, and prices here.
 *
 * IMPORTANT: `price` is in CENTS (Stripe requires integer cents).
 *   $12.00  -> 1200
 *   $54.99  -> 5499
 *
 * `id` must be unique across the whole file — it's used as the cart
 * key and passed to Stripe, so don't reuse an id between items.
 *
 * `visual` (1-4) picks a placeholder color block. Once you have real
 * photos, see README.md for how to swap in an actual <Image>.
 * ------------------------------------------------------------------
 */

export const preparedMeals = [
  {
    id: "meal-classic-plate",
    name: "Classic Plate Special",
    desc: "A hearty entrée served with two side options. Ask about today's rotating selection.",
    price: 1400,
    visual: 1,
    purchasable: true,
  },
  {
    id: "meal-comfort-bowl",
    name: "Comfort Bowl",
    desc: "A warm, made-to-order bowl combining a protein, grain, and seasonal vegetables.",
    price: 1300,
    visual: 2,
    purchasable: true,
  },
  {
    id: "meal-southfield-sandwich",
    name: "Southfield Sandwich",
    desc: "Freshly prepared sandwich served on request with a side of your choice.",
    price: 1100,
    visual: 3,
    purchasable: true,
  },
  {
    id: "meal-loaded-plate",
    name: "Loaded Plate Combo",
    desc: "Two entrée portions paired with two sides — a larger option for bigger appetites.",
    price: 1800,
    visual: 4,
    purchasable: true,
  },
];

export const foodItems = [
  {
    id: "item-seasoned-side",
    name: "Seasoned Side",
    desc: "A freshly prepared side dish, rotating based on availability and season.",
    price: 500,
    visual: 1,
    purchasable: true,
  },
  {
    id: "item-homestyle-snack",
    name: "Homestyle Snack",
    desc: "A quick, freshly made snack option for customers on the go.",
    price: 600,
    visual: 2,
    purchasable: true,
  },
  {
    id: "item-fresh-beverage",
    name: "Fresh Beverage",
    desc: "A refreshing beverage option available to pair with any order.",
    price: 300,
    visual: 3,
    purchasable: true,
  },
  {
    id: "item-sweet-treat",
    name: "Sweet Treat",
    desc: "A freshly prepared dessert item, available while supplies last.",
    price: 550,
    visual: 4,
    purchasable: true,
  },
];

export const familyPacks = [
  {
    id: "pack-family-classic",
    name: "Family Classic Pack",
    desc: "A full prepared meal packed for the table — feeds approximately 4 to 6 people. Includes entrée and side portions sized for the group.",
    price: 6500,
    visual: 4,
    purchasable: true,
  },
  {
    id: "pack-family-deluxe",
    name: "Family Deluxe Pack",
    desc: "Our largest take-home offering — a fuller entrée selection plus extra sides, built to comfortably feed 4 to 6 people.",
    price: 8000,
    visual: 1,
    purchasable: true,
  },
  {
    id: "pack-group-sampler",
    name: "Group Sampler Pack",
    desc: "A variety pack combining multiple prepared meal options — a good fit for small gatherings of 4 to 6 who want to try a bit of everything.",
    price: 7200,
    visual: 2,
    purchasable: true,
  },
];

export const eventServices = [
  {
    id: "event-small-gathering",
    name: "Small Gathering Package",
    desc: "Mobile food service for smaller private gatherings. Menu and quantities customized to your event.",
    price: null,
    priceLabel: "Starting at $150",
    visual: 2,
    purchasable: false,
  },
  {
    id: "event-community",
    name: "Community Event Service",
    desc: "On-site mobile food service for community events, fundraisers, and public gatherings.",
    price: null,
    priceLabel: "Custom Quote",
    visual: 3,
    purchasable: false,
  },
  {
    id: "event-office-group",
    name: "Office / Group Order",
    desc: "Pre-arranged meal packages prepared for pickup or delivery to a group setting.",
    price: null,
    priceLabel: "Custom Quote",
    visual: 4,
    purchasable: false,
  },
];

export const mobileOfferings = [
  {
    id: "mobile-walkup",
    name: "Walk-Up Service",
    desc: "Order and pay directly at our mobile service location during posted service hours.",
    price: null,
    priceLabel: "Menu Pricing",
    visual: 1,
    purchasable: false,
  },
  {
    id: "mobile-preorder",
    name: "Pre-Order Pickup",
    desc: "Contact us ahead of time to arrange a pickup order at a scheduled location and time.",
    price: null,
    priceLabel: "Menu Pricing",
    visual: 2,
    purchasable: false,
  },
];

// Flat lookup of every purchasable item, keyed by id — used by the
// checkout API route to validate cart contents and look up real
// prices server-side (never trust prices sent from the browser).
export const allPurchasableItems = [
  ...preparedMeals,
  ...foodItems,
  ...familyPacks,
].filter((item) => item.purchasable);

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
