"use client";

import Link from "next/link";
import { useState } from "react";
import siteConfig from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            SG
          </span>
          <span className="brand__text">
            <span className="brand__name">{siteConfig.businessName}</span>
            <span className="brand__sub">Mobile Food Service</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <nav className={`nav ${open ? "is-open" : ""}`}>
          <ul className="nav__list">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__ctas">
            <Link href="/menu" className="btn btn--outline" onClick={() => setOpen(false)}>
              View Menu
            </Link>
            <Link href="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
