"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      await refreshUser();
      router.push("/menu");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <span className="eyebrow">Create Account</span>
        <h1 style={{ marginTop: 12 }}>Sign up to order.</h1>
        <p style={{ color: "rgba(32,27,23,0.7)", marginBottom: 28 }}>
          Creating an account lets you track your order history and unlocks
          $0 delivery fee on your first delivery order.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" value={values.name} onChange={handleChange} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required value={values.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span className="form-note">At least 8 characters.</span>
          </div>

          {error && <p style={{ color: "var(--color-tomato)", fontSize: "0.9rem" }}>{error}</p>}

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: "0.92rem" }}>
          Already have an account? <Link href="/account/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}
