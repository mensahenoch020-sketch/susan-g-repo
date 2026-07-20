"use client";

import { useState } from "react";
import siteConfig from "@/lib/site-config";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "General Inquiry",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(`${values.reason} — ${values.name || "Website Contact"}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nReason: ${values.reason}\n\nMessage:\n${values.message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="reason">Reason for contact</label>
          <select id="reason" name="reason" value={values.reason} onChange={handleChange}>
            <option>General Inquiry</option>
            <option>Place an Order</option>
            <option>Event / Catering Request</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us a bit about what you need — order details, event date, location, and number of guests, if applicable."
        />
      </div>

      <div>
        <button type="submit" className="btn btn--primary">
          Send Message
        </button>
        <p className="form-note" style={{ marginTop: 12 }}>
          Submitting this form opens your email app to send your message to{" "}
          {siteConfig.email}. You can also reach us directly by email or
          phone below.
        </p>
        {status === "sent" && (
          <p className="form-note" style={{ color: "var(--color-basil)", fontWeight: 700 }}>
            Your email app should now be open with your message ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
