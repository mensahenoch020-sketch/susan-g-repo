import ContactForm from "@/components/ContactForm";
import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Susan G Enterprises to place an order or ask about mobile food service for your event in Southfield, Michigan and Oakland County.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Contact Us</span>
          <h1>We&rsquo;d love to hear from you.</h1>
          <p>
            Whether you have a question, want to place an order, or are
            planning an event, reach out using the information below or send
            us a message.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="info-card">
                <div className="info-card__label">Email</div>
                <div className="info-card__value">
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card__label">Phone</div>
                <div className="info-card__value">
                  <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card__label">Service Area</div>
                <div className="info-card__value" style={{ fontSize: "1.02rem" }}>
                  {siteConfig.serviceArea}
                </div>
              </div>
              <div className="info-card">
                <div className="info-card__label">Business Type</div>
                <div className="info-card__value" style={{ fontSize: "1.02rem" }}>
                  {siteConfig.businessType} &middot; Est. {siteConfig.startDate}
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: 20 }}>Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
