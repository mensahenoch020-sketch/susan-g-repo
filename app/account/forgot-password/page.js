"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetUrl("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMessage(data.message);
      if (data.resetUrl) setResetUrl(data.resetUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <span className="eyebrow">Account Recovery</span>
        <h1 style={{ marginTop: 12 }}>Reset your password.</h1>
        <p style={{ color: "rgba(32,27,23,0.7)", marginBottom: 24 }}>
          Enter the email address on your account and we&rsquo;ll help you
          reset your password.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {error && <p style={{ color: "var(--color-tomato)", fontSize: "0.9rem" }}>{error}</p>}

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Requesting…" : "Request Reset Link"}
          </button>
        </form>

        {message && (
          <div className="menu-note-box" style={{ marginTop: 24 }}>
            <h3>Check the link below</h3>
            <p>{message}</p>
            {resetUrl && (
              <p style={{ wordBreak: "break-all", marginTop: 12 }}>
                <a href={resetUrl} style={{ color: "var(--color-mustard)" }}>
                  {resetUrl}
                </a>
              </p>
            )}
            <p style={{ marginTop: 12, fontSize: "0.85rem" }}>
              Automated email delivery isn&rsquo;t set up on this site yet —
              this link is shown here directly so you (or the business,
              if they&rsquo;re helping you) can use it now. It expires in 1
              hour.
            </p>
          </div>
        )}

        <p style={{ marginTop: 20, fontSize: "0.92rem" }}>
          <Link href="/account/login">Back to login</Link>
        </p>
      </div>
    </section>
  );
}
