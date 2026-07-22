import FoodVisual from "@/components/FoodVisual";
import ScrollReveal from "@/components/ScrollReveal";
import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Susan G Enterprises, a mobile food service provider based in Southfield, Michigan, serving local customers, events, and community gatherings since 2021.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About Us</span>
          <h1>Mobile food service, rooted in the community.</h1>
          <p>
            {siteConfig.businessName} is owned and operated by{" "}
            {siteConfig.legalName}, serving {siteConfig.city},{" "}
            {siteConfig.stateAbbr} and the surrounding {siteConfig.county}{" "}
            community since {siteConfig.startDate}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ScrollReveal className="contact-grid">
            <div>
              <span className="eyebrow">Our Story</span>
              <h2>Bringing quality food directly to our neighbors.</h2>
              <p>
                {siteConfig.businessName} is a mobile food service business
                that provides freshly prepared food products to customers
                through convenient mobile operations. Rather than asking
                customers to come find us, we focus on bringing quality
                meals and food options directly to individuals, local
                customers, community events, and gatherings throughout the
                Southfield area.
              </p>
              <p>
                As a sole proprietorship operated by Susan Elizabeth
                Goudeseune, this business is built on a simple idea: good
                food and dependable, friendly service. Every order is
                prepared with care and offered with the goal of quality,
                convenience, and customer satisfaction.
              </p>
              <p>
                We are proud to be a small, local business serving Oakland
                County — one meal, one event, and one customer at a time.
              </p>
            </div>
            <FoodVisual variant={2} label="Susan G Enterprises — Photo Coming Soon" tall />
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--cream-alt">
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">What Guides Us</span>
              <h2>Our approach to mobile food service.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal-stagger grid-3" delay={100}>
            <div className="feature-card">
              <span className="feature-card__num">Quality</span>
              <h3>Freshly prepared</h3>
              <p>Food is prepared with attention to freshness and quality for every order, big or small.</p>
            </div>
            <div className="feature-card">
              <span className="feature-card__num">Convenience</span>
              <h3>We come to you</h3>
              <p>Mobile operations mean we can meet customers, events, and gatherings where they are.</p>
            </div>
            <div className="feature-card">
              <span className="feature-card__num">Community</span>
              <h3>Local &amp; personal</h3>
              <p>As a local Southfield business, we value the relationships we build with every customer.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
