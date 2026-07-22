# Susan G Enterprises — Website

A production-ready Next.js website for **Susan G Enterprises**, a mobile
food service business based in Southfield, Michigan. Built to be a
trustworthy, professional web presence suitable for customers and for
business verification (e.g. Stripe).

## What's included

- **Home, About, Menu, Contact, and FAQ pages**
- **Legal pages**: Privacy Policy, Terms of Service, Refund & Cancellation
  Policy
- **Full online ordering**: shopping cart, search, delivery/pickup
  selector with zip code checking, and secure Stripe Checkout
- **Customer accounts**: sign up/login, order history, and an automatic
  $0 delivery fee on a customer's genuine first order (requires a
  database — see section 3)
- Mobile-responsive, accessible design (keyboard-focus states, semantic
  HTML, reduced-motion support)
- SEO metadata on every page (titles, descriptions, Open Graph, Twitter
  card, JSON-LD local business schema, sitemap.xml, robots.txt)
- A contact form that opens the visitor's email client addressed to your
  business email
- All business information centralized in one editable file

---

## 1. Editing your business information

Almost everything you'll want to change lives in a single file:

```
lib/site-config.js
```

Open it and update fields like your email, phone number, service area, or
business description. Changes there automatically update the header,
footer, contact page, FAQ answers, and SEO tags across the whole site.

**Menu items** are defined in `lib/menu-data.js`, grouped into
`preparedMeals`, `burgersAndChicken`, `foodItems`, `drinksAndDesserts`,
`familyPacks`, `eventServices`, and `mobileOfferings`. Edit the `name`,
`desc`, and `price` fields to match your real offerings.

**Photos**: Every menu item in `lib/menu-data.js` has an `image` field
already pointing to an expected filename (e.g. `/images/classic-plate.jpg`).
Until that file actually exists in `public/images/`, the site
automatically shows a styled placeholder block instead — nothing breaks.

To add a real photo:
1. Take a photo of the actual item.
2. Upload it to `public/images/` on GitHub, using the *exact* filename
   already referenced in `lib/menu-data.js` for that item (e.g.
   `classic-plate.jpg`).
3. Commit. That item automatically shows your real photo — no code
   changes needed.

To add a photo for a new item, or change which filename an item expects,
edit its `image: "/images/your-filename.jpg"` field in `lib/menu-data.js`.

---

## 2. Online ordering (Stripe Checkout)

This site includes a full shopping cart and checkout, powered by Stripe.

**How it works:**
1. Customers click **Add to Cart** on menu items (Prepared Meals, Burgers
   & Chicken, Food Items, Drinks & Desserts, and Family & Group Packs are
   all purchasable — Event Services and Mobile Offerings are "request a
   quote" only, since those need custom pricing).
2. Customers can search the menu, choose Pickup or Delivery (with a zip
   code check against your configured delivery area), and add notes to
   individual items (e.g. "no onions").
3. The cart drawer and a persistent bottom cart bar show items, quantities,
   and a running subtotal while customers keep browsing.
4. **Checkout with Stripe** sends the cart to a secure server-side route
   (`app/api/checkout/route.js`), which creates a Stripe Checkout Session
   using the *real* prices stored in `lib/menu-data.js` (never prices sent
   from the browser — this prevents tampering).
5. The customer is redirected to Stripe's hosted, secure payment page.
6. After payment, they're redirected back to `/order-confirmation`, and
   their cart is cleared.
7. You'll see the completed payment in your
   [Stripe Dashboard](https://dashboard.stripe.com/payments).

**Required setup — add your Stripe secret key:**

1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com) and go to
   **Developers → API keys**.
2. Copy your **Secret key** (starts with `sk_live_...` for real payments,
   or `sk_test_...` for Stripe's test mode).
3. **Do not** put this key in your code or commit it to GitHub.
4. In Railway, go to your project → your service → **Variables** tab, and
   add:
   - Key: `STRIPE_SECRET_KEY`
   - Value: your secret key
5. Redeploy. Checkout will now work on your live site.

For local development, copy `.env.example` to a new file named `.env.local`
and paste your key there instead (this file is already excluded from git
via `.gitignore`).

**Editing menu items and prices:** all purchasable items live in
`lib/menu-data.js`. Prices are in **cents** (e.g. `1400` = $14.00) because
that's the format Stripe requires. Update names, descriptions, and prices
there — both the Menu page and Stripe Checkout will automatically reflect
your changes.

**Testing before going live:** it's strongly recommended to place one real
test order yourself the moment this is deployed, to confirm the full flow
(add to cart → checkout → payment → confirmation page) works end to end
before sharing the link with customers.

---

## 3. Accounts, order history & delivery (requires a database)

This site includes account sign up/login, order history, a delivery vs.
pickup selector with zip code checking, and a genuine first-order $0
delivery fee waiver for logged-in customers. These features need a real
database — without it, the rest of the site (browsing, cart, checkout)
still works fine, but accounts/order history will show a friendly error.

### Step 1 — Add a Postgres database on Railway

1. In your Railway project, click **+ New** → **Database** → **Add PostgreSQL**.
2. Railway creates the database and automatically provides a `DATABASE_URL`
   variable — click on your **web service** (not the database) → **Variables**
   tab, and confirm `DATABASE_URL` is listed (Railway usually links it
   automatically; if not, copy the value from the Postgres service's
   Variables tab and add it to your web service).

### Step 2 — Add a session secret

Accounts need a secret key to securely sign login sessions. Generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output, then in Railway → your web service → **Variables**, add:
- Key: `SESSION_SECRET`
- Value: (the random string you generated)

### Step 3 — Set up the Stripe webhook (for reliable order tracking)

This lets Stripe tell your site directly when a payment succeeds — more
reliable than relying on the customer's browser redirect.

1. In [Stripe Dashboard](https://dashboard.stripe.com) → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://yourdomain.com/api/stripe-webhook` (use your
   real Railway or custom domain).
3. Select the event: `checkout.session.completed`.
4. After creating it, click into the endpoint and copy the **Signing secret**.
5. In Railway → your web service → **Variables**, add:
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: (the signing secret, starts with `whsec_...`)

### Step 4 — Redeploy

Once `DATABASE_URL`, `SESSION_SECRET`, and `STRIPE_WEBHOOK_SECRET` are all
set, redeploy your Railway service. On this deploy, Prisma will
automatically set up the database tables it needs (via `prisma migrate
deploy`, which runs as part of the build script).

**Editing your delivery zip codes:** the list of zip codes you deliver to
lives in `lib/site-config.js` under `deliveryZips`. Add or remove zip
codes there to match your real delivery range.

**Editing the delivery fee:** the flat delivery fee is set in
`app/api/checkout/route.js` near the top (`DELIVERY_FEE_CENTS`), in cents.

---

## 4. Running the site locally

**Requirements:** Node.js 18.18 or later ([download here](https://nodejs.org)).

```bash
# 1. Install dependencies
npm install

# 2. Start the local dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
The page will hot-reload as you edit files.

To test a production build locally before deploying:

```bash
npm run build
npm run start
```

---

## 5. Deploying on Railway

### Option A — Deploy from GitHub (recommended)

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [railway.app](https://railway.app) and sign in.
3. Click **New Project → Deploy from GitHub repo**, and select this
   repository.
4. Railway will automatically detect this as a Node.js/Next.js app (via
   the included `railway.json` and Nixpacks) and run:
   - Build: `npm install && npm run build`
   - Start: `npm run start`
5. Once the build finishes, Railway will give you a live URL like
   `susan-g-enterprises-production.up.railway.app`.

### Option B — Deploy with the Railway CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Environment variables on Railway

This site doesn't require any environment variables to function — all
business details live in `lib/site-config.js`. If you'd like to set
`NEXT_PUBLIC_SITE_URL` explicitly (recommended once you have a custom
domain), add it under your Railway project's **Variables** tab using the
values shown in `.env.example`.

Railway automatically sets a `PORT` variable; the `npm run start` script
in `package.json` is already configured to use it.

---

## 6. Connecting a custom domain

1. In your Railway project, open your service and go to **Settings → Networking → Custom Domain**.
2. Click **Add Domain** and enter your domain (e.g. `susangenterprises.com`).
3. Railway will show you a CNAME record to add.
4. Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
   and add that CNAME record in your DNS settings.
5. Wait for DNS to propagate (usually a few minutes up to a few hours).
6. Once connected, update `siteUrl` in `lib/site-config.js` to your new
   domain and redeploy so SEO tags and the sitemap reflect the correct
   URL.

---

## 7. Project structure

```
app/
  layout.js            Root layout, global SEO metadata, JSON-LD schema
  page.js              Home page
  about/page.js         About page
  menu/page.js          Menu / services page
  contact/page.js        Contact page
  faq/page.js            FAQ page
  privacy-policy/page.js       Privacy Policy
  terms-of-service/page.js      Terms of Service
  refund-policy/page.js         Refund & Cancellation Policy
  order-confirmation/           Post-checkout thank-you page (clears cart)
  account/signup/page.js         Sign up page
  account/login/page.js          Login page
  account/orders/page.js         Order history page
  api/checkout/route.js         Server-side Stripe Checkout Session creation
  api/stripe-webhook/route.js    Marks orders paid, tracks first-order status
  api/auth/signup/route.js       Create account
  api/auth/login/route.js        Log in
  api/auth/logout/route.js       Log out
  api/auth/me/route.js           Check current session
  api/orders/route.js            Fetch logged-in user's order history
  sitemap.js            Auto-generated sitemap.xml
  robots.js             Auto-generated robots.txt
  globals.css           Design system & all site styling
components/
  Header.js             Site navigation (with mobile menu, cart, account icon)
  Footer.js              Site footer
  ContactForm.js          Contact form (opens visitor's email client)
  FoodVisual.js           Placeholder food-photo block (swap for real photos)
  MenuSection.js          Menu category renderer with Add to Cart buttons
  MenuSearch.js            Live menu search bar
  DeliveryPickupSelector.js  Pickup/Delivery toggle + zip code checker
  FirstOrderBanner.js      "$0 delivery fee on first order" banner
  CartButton.js           Header cart icon + item count
  CartDrawer.js           Slide-out cart with special instructions + checkout
  StickyCartBar.js         Persistent "view cart" bar while browsing
  AccountMenu.js           Header account icon / login-logout dropdown
lib/
  site-config.js         Central business info & delivery zip codes — edit this first
  menu-data.js            All menu items & prices — edit this to update the menu
  cart-context.js          Cart state management (React context)
  auth-context.js          Client-side logged-in user state
  auth.js                  Password hashing & session token utilities
  prisma.js                Database client
  get-current-user.js       Server-side helper to read the logged-in user
prisma/
  schema.prisma            Database schema (Users, Orders)
```

---

## 8. Before going live — a checklist

- [ ] Add your `STRIPE_SECRET_KEY` in Railway's Variables tab (see section 2)
- [ ] Add a Postgres database, `DATABASE_URL`, `SESSION_SECRET`, and
      `STRIPE_WEBHOOK_SECRET` if you want accounts/order history/delivery
      fee waiver to work (see section 3)
- [ ] Place one real test order yourself to confirm checkout works end to end
- [ ] Create a test account and confirm sign up, login, and order history work
- [ ] Review and update menu items/pricing in `lib/menu-data.js`
- [ ] Confirm your delivery zip codes in `lib/site-config.js` are accurate
- [ ] Add real photos of your food (see section 1 above)
- [ ] Confirm business email and phone number in `lib/site-config.js`
- [ ] Update `siteUrl` once your custom domain is connected
- [ ] Read through the Privacy Policy, Terms of Service, and Refund
      Policy — these are written to be accurate for a small sole
      proprietorship, but you should review them (and consider having a
      professional review them) before relying on them legally
- [ ] Confirm your service area and business details are accurate
- [ ] Test the contact form and all navigation links after deploying
