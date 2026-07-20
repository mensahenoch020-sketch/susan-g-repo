import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Susan G Enterprises' mobile food service, ordering process, event availability, and how to get in touch.",
};

const faqs = [
  {
    q: "What services do you provide?",
    a: `${siteConfig.businessName} provides freshly prepared food products through mobile food service operations. We offer prepared meals and food items for individual customers, as well as food services for community events and private gatherings.`,
  },
  {
    q: "How can customers place orders?",
    a: `Customers can place orders by contacting us directly by phone or email, or by visiting us at our mobile service location during posted service times. Orders and event inquiries can also be submitted through the contact form on this website.`,
  },
  {
    q: "Do you provide food for events?",
    a: `Yes. We offer event food services for community events and private gatherings in the ${siteConfig.county} area. Menu selections and quantities can be customized based on the size and needs of your event — reach out to discuss details and availability.`,
  },
  {
    q: "What areas do you serve?",
    a: `We are based in ${siteConfig.city}, ${siteConfig.stateAbbr} and primarily serve ${siteConfig.serviceArea}. If you're unsure whether we serve your location, please contact us to confirm.`,
  },
  {
    q: "How do I pay for my order?",
    a: `Payments are collected at the time of purchase. We accept electronic payments along with other accepted payment methods. Specific accepted payment types may be confirmed at the time of your order.`,
  },
  {
    q: "How can customers contact you?",
    a: `You can reach ${siteConfig.businessName} by email at ${siteConfig.email}, by phone at ${siteConfig.phone}, or by submitting the contact form on our Contact page.`,
  },
  {
    q: "Is Susan G Enterprises a licensed business?",
    a: `Susan G Enterprises operates as a sole proprietorship. Please contact us directly if you have questions about our business registration, permits, or licensing for a specific event or engagement.`,
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">FAQ</span>
          <h1>Frequently asked questions.</h1>
          <p>Answers to some of the most common questions we receive from customers.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          {faqs.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
