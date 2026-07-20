import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.businessName}, explaining how we collect, use, and protect customer information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal">
      <span className="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p className="legal__updated">Last updated: July 20, 2026</p>

      <p>
        This Privacy Policy explains how {siteConfig.businessName} (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by {siteConfig.legalName} as a{" "}
        {siteConfig.businessType.toLowerCase()}, collects, uses, and
        protects information when you visit our website, contact us, or
        purchase food products or services from us.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Contact information</strong> you provide directly, such as
          your name, email address, and phone number, when you use our
          contact form, email us, or call us.
        </li>
        <li>
          <strong>Order and event details</strong> you share with us to
          fulfill a food order or plan an event, such as pickup location,
          event date, and quantities requested.
        </li>
        <li>
          <strong>Payment information</strong> is collected and processed at
          the time of purchase through the payment method used (for example,
          a card payment processor). We do not store full payment card
          numbers on our own systems.
        </li>
        <li>
          <strong>Basic website usage information</strong>, such as general
          analytics data, which may be collected automatically if analytics
          tools are enabled on this site.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Prepare and fulfill your food orders or event service requests.</li>
        <li>Respond to inquiries submitted through our contact form, email, or phone.</li>
        <li>Communicate with you about your order or an upcoming event.</li>
        <li>Improve our service offerings and website.</li>
        <li>Comply with applicable legal and tax obligations.</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>
        We do not sell customer information. We may share limited
        information with trusted third parties only where necessary, such
        as:
      </p>
      <ul>
        <li>Payment processors (for example, Stripe) to process electronic payments securely.</li>
        <li>Service providers who help us operate our business (such as website hosting).</li>
        <li>Government or regulatory authorities, if required by law.</li>
      </ul>

      <h2>4. Payment Processing</h2>
      <p>
        Electronic payments made to {siteConfig.businessName} are processed
        by third-party payment processors. These processors have their own
        privacy policies governing the handling of your payment
        information, and we encourage you to review them. We do not have
        access to and do not store your full card details.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain contact and order information only for as long as
        reasonably necessary to fulfill orders, respond to inquiries, and
        meet legal or tax record-keeping obligations.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable steps to protect the information you share with
        us. However, no method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Your Choices</h2>
      <p>
        You may contact us at any time to ask what information we hold
        about you, to request a correction, or to request that we delete
        contact information that is no longer needed for order fulfillment
        or legal purposes.
      </p>

      <h2>8. Children&rsquo;s Privacy</h2>
      <p>
        Our website and services are not directed to children under 13, and
        we do not knowingly collect personal information from children
        under 13.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes
        will be posted on this page with an updated revision date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your
        information is handled, please contact us:
      </p>
      <ul>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Phone: <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a></li>
        <li>Service Area: {siteConfig.serviceArea}</li>
      </ul>
    </div>
  );
}
