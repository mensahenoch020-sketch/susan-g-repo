"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
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
      const res = await fetch("/api/auth/login", {
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
        <span className="eyebrow">Welcome Back</span>
        <h1 style={{ marginTop: 12 }}>Log in.</h1>

        <form className="form" onSubmit={handleSubmit} style={{ marginTop: 28 }}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required value={values.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          {error && <p style={{ color: "var(--color-tomato)", fontSize: "0.9rem" }}>{error}</p>}

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: "0.92rem" }}>
          Don&rsquo;t have an account? <Link href="/account/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
