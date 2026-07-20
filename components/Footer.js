import Link from "next/link";
import siteConfig from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand">
              <span className="brand__mark" aria-hidden="true">
                SG
              </span>
              <span className="brand__name">{siteConfig.businessName}</span>
            </Link>
            <p style={{ maxWidth: "34ch", fontSize: "0.92rem" }}>
              Freshly prepared food, delivered through convenient mobile
              service to {siteConfig.city}, {siteConfig.stateAbbr} and
              surrounding communities.
            </p>
          </div>

          <div>
            <h4>Navigate</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/menu">Menu</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
              </li>
              <li>{siteConfig.serviceArea}</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {year} {siteConfig.businessName}. All rights reserved.
          </span>
          <span>
            {siteConfig.legalName} &middot; {siteConfig.businessType}
          </span>
        </div>
      </div>
    </footer>
  );
}
