import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.businessName}, covering use of our website and purchase of our food products and services.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="legal">
      <span className="eyebrow">Legal</span>
      <h1>Terms of Service</h1>
      <p className="legal__updated">Last updated: July 20, 2026</p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
        {siteConfig.businessName} website and your purchase of food products
        and services from {siteConfig.businessName}, operated by{" "}
        {siteConfig.legalName} as a {siteConfig.businessType.toLowerCase()}{" "}
        based in {siteConfig.city}, {siteConfig.stateAbbr}. By using our
        website or placing an order with us, you agree to these Terms.
      </p>

      <h2>1. About Our Business</h2>
      <p>
        {siteConfig.businessName} is a mobile food service business
        providing freshly prepared food products to individual customers,
        local community members, and events or gatherings within{" "}
        {siteConfig.serviceArea}.
      </p>

      <h2>2. Orders and Availability</h2>
      <p>
        Menu items, availability, service locations, and pricing are subject
        to change without notice and may vary based on ingredient
        availability, weather, or scheduling. We will make reasonable
        efforts to communicate any changes that affect a specific order or
        event booking.
      </p>

      <h2>3. Payment</h2>
      <p>
        Payment is due at the time of purchase. We accept electronic
        payments and other accepted payment methods as made available at
        the point of sale. For event bookings, payment terms (including any
        deposit requirements) will be communicated and agreed upon directly
        with the customer prior to the event.
      </p>

      <h2>4. Event and Catering Bookings</h2>
      <p>
        Event food service bookings are based on availability and are
        confirmed only once both parties agree on date, location, menu, and
        pricing. We recommend contacting us as early as possible to confirm
        availability for your event date.
      </p>

      <h2>5. Food Safety and Allergies</h2>
      <p>
        We take food preparation seriously and aim to handle all food
        products safely. However, our food may be prepared in an
        environment that also handles common allergens (such as dairy,
        eggs, wheat, soy, tree nuts, or shellfish). Customers with food
        allergies or dietary restrictions should inform us prior to
        ordering so we can share what information is available, though we
        cannot guarantee any item is completely free of a given allergen.
      </p>

      <h2>6. Website Use</h2>
      <p>
        This website is provided for informational purposes and to help
        customers learn about and contact {siteConfig.businessName}. You
        agree to use this website only for lawful purposes and not to
        misuse the contact form or attempt to disrupt the site&rsquo;s
        normal operation.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The content on this website, including text, layout, and graphics,
        is the property of {siteConfig.businessName} unless otherwise noted
        and may not be copied or reused without permission.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.businessName}{" "}
        and {siteConfig.legalName} shall not be liable for any indirect,
        incidental, or consequential damages arising from the use of this
        website or the purchase of food products or services, except where
        such limitation is not permitted by applicable law.
      </p>

      <h2>9. Refunds and Cancellations</h2>
      <p>
        Please see our{" "}
        <a href="/refund-policy">Refund &amp; Cancellation Policy</a> for
        information about order changes, cancellations, and refunds.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Michigan,
        without regard to its conflict of law principles.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of our
        website or services after changes are posted constitutes acceptance
        of the updated Terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>Questions about these Terms can be directed to:</p>
      <ul>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Phone: <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a></li>
      </ul>
    </div>
  );
}
