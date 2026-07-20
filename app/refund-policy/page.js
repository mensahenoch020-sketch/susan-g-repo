import siteConfig from "@/lib/site-config";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation policy for orders and event bookings placed with ${siteConfig.businessName}.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="legal">
      <span className="eyebrow">Legal</span>
      <h1>Refund &amp; Cancellation Policy</h1>
      <p className="legal__updated">Last updated: July 20, 2026</p>

      <p>
        This policy explains how {siteConfig.businessName} handles order
        changes, cancellations, and refund requests. Because we prepare
        fresh food to order, our policy is designed to be fair to both our
        customers and our small business.
      </p>

      <h2>1. Individual Food Orders</h2>
      <p>
        Because food items are freshly prepared, individual orders are
        generally considered final once preparation has begun. If there is
        an issue with your order — such as an incorrect item or a quality
        concern — please contact us as soon as possible, ideally at the
        time of pickup or within a reasonable time afterward, so we can
        make it right.
      </p>

      <h2>2. Order Errors</h2>
      <p>
        If you receive an incorrect order or believe there was an error on
        our part, please contact us right away. Depending on the situation,
        we may offer a replacement, a partial refund, or another resolution
        at our discretion.
      </p>

      <h2>3. Event and Catering Bookings</h2>
      <p>
        For event or catering bookings, cancellation terms will be
        discussed and agreed upon directly with the customer at the time of
        booking, since event planning often involves advance purchasing of
        ingredients and scheduling. As a general guideline:
      </p>
      <ul>
        <li>
          Cancellations made with reasonable advance notice before the
          event date may be eligible for a full or partial refund of any
          deposit or advance payment, depending on how much preparation has
          already occurred.
        </li>
        <li>
          Cancellations made close to the event date may not be eligible
          for a refund, particularly if food purchasing or preparation has
          already begun.
        </li>
        <li>
          Specific refund eligibility and timelines for a given event will
          be communicated in writing (such as by email or text) at the time
          the booking is confirmed.
        </li>
      </ul>

      <h2>4. Payment Processing and Chargebacks</h2>
      <p>
        Electronic payments are processed through third-party payment
        processors. If you have a concern about a charge, we encourage you
        to contact us directly first so we can try to resolve the issue
        before a dispute or chargeback is filed with your bank or card
        issuer.
      </p>

      <h2>5. How to Request a Refund</h2>
      <p>To request a refund or report an issue with an order, please contact us with:</p>
      <ul>
        <li>Your name and contact information</li>
        <li>The date and details of your order or event</li>
        <li>A description of the issue</li>
      </ul>
      <p>We will review each request individually and respond as promptly as we can.</p>

      <h2>6. Contact Us</h2>
      <ul>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Phone: <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a></li>
      </ul>
    </div>
  );
}
