# Susan G Enterprises — Website

A production-ready Next.js website for **Susan G Enterprises**, a mobile
food service business based in Southfield, Michigan. Built to be a
trustworthy, professional web presence suitable for customers and for
business verification (e.g. Stripe).

## What's included

- **Home, About, Menu, Contact, and FAQ pages**
- **Legal pages**: Privacy Policy, Terms of Service, Refund & Cancellation
  Policy
- Mobile-responsive, accessible design (keyboard-focus states, semantic
  HTML, reduced-motion support)
- SEO metadata on every page (titles, descriptions, Open Graph, Twitter
  card, JSON-LD local business schema, sitemap.xml, robots.txt)
- A contact form that opens the visitor's email client addressed to your
  business email (no backend/database required)
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

**Menu items** are defined separately in `app/menu/page.js` near the top
of the file, in four arrays: `preparedMeals`, `foodItems`,
`eventServices`, and `mobileOfferings`. Edit the `name`, `desc`, and
`price` fields to match your real offerings.

**Photos**: The menu and homepage currently use styled placeholder blocks
(via the `FoodVisual` component) instead of stock photography, since you
should only publish real photos of your own food. To add real photos:

1. Add your image files to `public/images/` (e.g. `public/images/pulled-pork-plate.jpg`).
2. In the relevant page file, replace the `<FoodVisual ... />` component
   with Next.js's built-in image component, for example:

   ```jsx
   import Image from "next/image";

   <Image
     src="/images/pulled-pork-plate.jpg"
     alt="Pulled pork plate with two sides"
     width={400}
     height={400}
     style={{ objectFit: "cover", width: "100%", height: "100%" }}
   />
   ```

---

## 2. Running the site locally

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

## 3. Deploying on Railway

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

## 4. Connecting a custom domain

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

## 5. Project structure

```
app/
  layout.js            Root layout, global SEO metadata, JSON-LD schema
  page.js              Home page
  about/page.js         About page
  menu/page.js          Menu / services page (edit menu items here)
  contact/page.js        Contact page
  faq/page.js            FAQ page
  privacy-policy/page.js       Privacy Policy
  terms-of-service/page.js      Terms of Service
  refund-policy/page.js         Refund & Cancellation Policy
  sitemap.js            Auto-generated sitemap.xml
  robots.js             Auto-generated robots.txt
  globals.css           Design system & all site styling
components/
  Header.js             Site navigation (with mobile menu)
  Footer.js              Site footer
  ContactForm.js          Contact form (opens visitor's email client)
  FoodVisual.js           Placeholder food-photo block (swap for real photos)
lib/
  site-config.js         Central business info — edit this first
```

---

## 6. Before going live — a checklist

- [ ] Review and update menu items/pricing in `app/menu/page.js`
- [ ] Add real photos of your food (see section 1 above)
- [ ] Confirm business email and phone number in `lib/site-config.js`
- [ ] Update `siteUrl` once your custom domain is connected
- [ ] Read through the Privacy Policy, Terms of Service, and Refund
      Policy — these are written to be accurate for a small sole
      proprietorship, but you should review them (and consider having a
      professional review them) before relying on them legally
- [ ] Confirm your service area and business details are accurate
- [ ] Test the contact form and all navigation links after deploying
