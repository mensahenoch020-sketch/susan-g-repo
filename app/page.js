import Link from "next/link";
import HomeVisual from "@/components/HomeVisual";
import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Home",
  description:
    "Susan G Enterprises is a mobile food service business serving freshly prepared meals to Southfield, Michigan and Oakland County. View our menu or get in touch to place an order.",
};

const highlights = [
  {
    num: "Made Fresh",
    title: "Freshly prepared food",
    body: "Every order is prepared with care, using quality ingredients — never sitting around waiting.",
  },
  {
    num: "We Come to You",
    title: "Mobile convenience",
    body: "We bring the kitchen to individuals, offices, and community events across the Southfield area.",
  },
  {
    num: "Easy Checkout",
    title: "Simple payment options",
    body: "Pay at the time of purchase with electronic payment and other accepted payment methods.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div>
            <span className="eyebrow">Southfield, Michigan &middot; Since {siteConfig.startYear}</span>
            <h1>
              Freshly made food, brought <em>right to your neighborhood.</em>
            </h1>
            <p className="hero__lede">{siteConfig.shortDescription}</p>
            <div className="hero__ctas">
              <Link href="/menu" className="btn btn--primary">
                View Menu
              </Link>
              <Link href="/contact" className="btn btn--outline-light">
                Contact Us
              </Link>
            </div>

            <div className="hero__meta">
              <div>
                <strong>{siteConfig.county}</strong>
                <span>Proudly based &amp; operating</span>
              </div>
              <div>
                <strong>Individuals &amp; Events</strong>
                <span>Who we serve</span>
              </div>
              <div>
                <strong>In-Person Payment</strong>
                <span>Pay at time of purchase</span>
              </div>
            </div>
          </div>

          <div className="ticket">
            <div className="ticket__head">
              <span>Order Ticket</span>
              <span>No. 0421</span>
            </div>
            <div className="ticket__row">
              <span>Service</span>
              <span>Mobile Food</span>
            </div>
            <div className="ticket__row">
              <span>Location</span>
              <span>Southfield, MI</span>
            </div>
            <div className="ticket__row">
              <span>Order Type</span>
              <span>Walk-Up / Event</span>
            </div>
            <div className="ticket__row">
              <span>Payment</span>
              <span>Card / Electronic</span>
            </div>
            <div className="ticket__foot">Thank you for supporting a local business</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What We Offer</span>
            <h2>Good food, honest service.</h2>
            <p style={{ color: "rgba(32,27,23,0.7)", fontSize: "1.02rem" }}>
              Susan G Enterprises brings quality, freshly prepared food
              directly to customers — whether you&apos;re grabbing a meal for
              yourself or feeding a crowd at your next event.
            </p>
          </div>

          <div className="grid-3">
            {highlights.map((item) => (
              <div className="feature-card" key={item.title}>
                <span className="feature-card__num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">From the Kitchen</span>
            <h2>A look at what we serve.</h2>
          </div>
          <div className="grid-3">
            <HomeVisual
              variant={1}
              image="/images/hero-prepared-meal.jpg"
              alt="A prepared meal from Susan G Enterprises"
              label="Prepared Meal — Photo Coming Soon"
            />
            <HomeVisual
              variant={2}
              image="/images/hero-signature-item.jpg"
              alt="A signature item from Susan G Enterprises"
              label="Signature Item — Photo Coming Soon"
            />
            <HomeVisual
              variant={3}
              image="/images/hero-event-spread.jpg"
              alt="An event food spread by Susan G Enterprises"
              label="Event Spread — Photo Coming Soon"
            />
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/menu" className="btn btn--dark">
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-band__inner">
          <div>
            <h2>Planning an event or gathering?</h2>
            <p>We&apos;re happy to talk through mobile food service for your next occasion.</p>
          </div>
          <Link href="/contact" className="btn btn--dark">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
