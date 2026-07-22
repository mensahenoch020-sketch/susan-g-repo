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
 * ADDING A REAL PHOTO:
 * 1. Upload your photo file to public/images/ on GitHub
 *    (e.g. public/images/classic-plate.jpg)
 * 2. Find that item below and set its `image` field to the path,
 *    starting with /images/, e.g.:
 *       image: "/images/classic-plate.jpg",
 * 3. That's it — the site automatically shows the real photo instead
 *    of the placeholder color block once `image` is set.
 *
 * Leave `image: ""` (empty) for any item that doesn't have a photo
 * yet — it will keep showing the labeled placeholder block, and the
 * `visual` number just picks which placeholder color it uses.
 * ------------------------------------------------------------------
 */

export const preparedMeals = [
  {
    id: "meal-classic-plate",
    name: "Classic Plate Special",
    desc: "A hearty entrée served with two side options. Ask about today's rotating selection.",
    price: 1400,
    visual: 1,
    image: "/images/classic-plate.jpg",
    purchasable: true,
    tags: ["plate", "meal"],
  },
  {
    id: "meal-comfort-bowl",
    name: "Comfort Bowl",
    desc: "A warm, made-to-order bowl combining a protein, grain, and seasonal vegetables.",
    price: 1300,
    visual: 2,
    image: "/images/comfort-bowl.jpg",
    purchasable: true,
    tags: ["bowl", "meal"],
  },
  {
    id: "meal-southfield-sandwich",
    name: "Southfield Sandwich",
    desc: "Freshly prepared sandwich served on request with a side of your choice.",
    price: 1100,
    visual: 3,
    image: "/images/southfield-sandwich.jpg",
    purchasable: true,
    tags: ["sandwich"],
  },
  {
    id: "meal-loaded-plate",
    name: "Loaded Plate Combo",
    desc: "Two entrée portions paired with two sides — a larger option for bigger appetites.",
    price: 1800,
    visual: 4,
    image: "/images/loaded-plate.jpg",
    purchasable: true,
    tags: ["plate", "meal"],
  },
];

export const foodItems = [
  {
    id: "item-seasoned-side",
    name: "Seasoned Side",
    desc: "A freshly prepared side dish, rotating based on availability and season.",
    price: 500,
    visual: 1,
    image: "/images/seasoned-side.jpg",
    purchasable: true,
    tags: ["side"],
  },
  {
    id: "item-homestyle-snack",
    name: "Homestyle Snack",
    desc: "A quick, freshly made snack option for customers on the go.",
    price: 600,
    visual: 2,
    image: "/images/homestyle-snack.jpg",
    purchasable: true,
    tags: ["snack"],
  },
  {
    id: "item-sweet-treat",
    name: "Sweet Treat",
    desc: "A freshly prepared dessert item, available while supplies last.",
    price: 550,
    visual: 4,
    image: "/images/sweet-treat.jpg",
    purchasable: true,
    tags: ["dessert"],
  },
];

export const burgersAndChicken = [
  {
    id: "food-classic-burger",
    name: "Classic Burger",
    desc: "A freshly grilled burger served on a toasted bun with standard fixings.",
    price: 900,
    visual: 3,
    image: "/images/classic-burger.jpg",
    purchasable: true,
    tags: ["burger"],
  },
  {
    id: "food-cheeseburger",
    name: "Cheeseburger",
    desc: "Our classic burger topped with melted cheese.",
    price: 1000,
    visual: 1,
    image: "/images/cheeseburger.jpg",
    purchasable: true,
    tags: ["burger"],
  },
  {
    id: "food-chicken-plate",
    name: "Chicken Plate",
    desc: "Freshly prepared chicken served with your choice of side.",
    price: 1200,
    visual: 2,
    image: "/images/chicken-plate.jpg",
    purchasable: true,
    tags: ["chicken"],
  },
  {
    id: "food-chicken-sandwich",
    name: "Chicken Sandwich",
    desc: "A freshly prepared chicken sandwich served on request.",
    price: 950,
    visual: 4,
    image: "/images/chicken-sandwich.jpg",
    purchasable: true,
    tags: ["chicken", "sandwich"],
  },
];

export const drinksAndDesserts = [
  {
    id: "drink-coke",
    name: "Coca-Cola",
    desc: "Ice-cold Coca-Cola, served chilled.",
    price: 250,
    visual: 1,
    image: "/images/coca-cola.jpg",
    purchasable: true,
    tags: ["drink", "soda"],
  },
  {
    id: "drink-assorted-soda",
    name: "Assorted Soda",
    desc: "A selection of soda options — ask what's available at time of order.",
    price: 250,
    visual: 3,
    image: "/images/assorted-soda.jpg",
    purchasable: true,
    tags: ["drink", "soda"],
  },
  {
    id: "item-fresh-beverage",
    name: "Fresh Beverage",
    desc: "A refreshing non-soda beverage option available to pair with any order.",
    price: 300,
    visual: 3,
    image: "/images/fresh-beverage.jpg",
    purchasable: true,
    tags: ["drink"],
  },
  {
    id: "dessert-ice-cream",
    name: "Ice Cream",
    desc: "A scoop of ice cream, served as a sweet finish to your order.",
    price: 400,
    visual: 4,
    image: "/images/ice-cream.jpg",
    purchasable: true,
    tags: ["dessert", "ice cream"],
  },
];

export const familyPacks = [
  {
    id: "pack-family-classic",
    name: "Family Classic Pack",
    desc: "A full prepared meal packed for the table — feeds approximately 4 to 6 people. Includes entrée and side portions sized for the group.",
    price: 6500,
    visual: 4,
    image: "/images/family-classic-pack.jpg",
    purchasable: true,
    tags: ["family", "pack"],
  },
  {
    id: "pack-family-deluxe",
    name: "Family Deluxe Pack",
    desc: "Our largest take-home offering — a fuller entrée selection plus extra sides, built to comfortably feed 4 to 6 people.",
    price: 8000,
    visual: 1,
    image: "/images/family-deluxe-pack.jpg",
    purchasable: true,
    tags: ["family", "pack"],
  },
  {
    id: "pack-group-sampler",
    name: "Group Sampler Pack",
    desc: "A variety pack combining multiple prepared meal options — a good fit for small gatherings of 4 to 6 who want to try a bit of everything.",
    price: 7200,
    visual: 2,
    image: "/images/group-sampler-pack.jpg",
    purchasable: true,
    tags: ["family", "pack"],
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
    image: "",
    purchasable: false,
  },
  {
    id: "event-community",
    name: "Community Event Service",
    desc: "On-site mobile food service for community events, fundraisers, and public gatherings.",
    price: null,
    priceLabel: "Custom Quote",
    visual: 3,
    image: "",
    purchasable: false,
  },
  {
    id: "event-office-group",
    name: "Office / Group Order",
    desc: "Pre-arranged meal packages prepared for pickup or delivery to a group setting.",
    price: null,
    priceLabel: "Custom Quote",
    visual: 4,
    image: "",
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
    image: "",
    purchasable: false,
  },
  {
    id: "mobile-preorder",
    name: "Pre-Order Pickup",
    desc: "Contact us ahead of time to arrange a pickup order at a scheduled location and time.",
    price: null,
    priceLabel: "Menu Pricing",
    visual: 2,
    image: "",
    purchasable: false,
  },
];

// Flat lookup of every purchasable item, keyed by id — used by the
// checkout API route to validate cart contents and look up real
// prices server-side (never trust prices sent from the browser).
export const allPurchasableItems = [
  ...preparedMeals,
  ...foodItems,
  ...burgersAndChicken,
  ...drinksAndDesserts,
  ...familyPacks,
].filter((item) => item.purchasable);

// Flat list of every purchasable item, used by the menu search bar.
export const searchableMenu = allPurchasableItems;

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
