"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccess(true);
      window.setTimeout(() => router.push("/account/login"), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 480 }}>
          <span className="eyebrow">Reset Password</span>
          <h1 style={{ marginTop: 12 }}>Missing reset link.</h1>
          <p style={{ color: "rgba(32,27,23,0.7)" }}>
            This page needs a valid reset link.{" "}
            <Link href="/account/forgot-password">Request a new one</Link>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <span className="eyebrow">Reset Password</span>
        <h1 style={{ marginTop: 12 }}>Choose a new password.</h1>

        {success ? (
          <p style={{ color: "var(--color-basil)", fontWeight: 600 }}>
            Password updated. Redirecting you to log in…
          </p>
        ) : (
          <form className="form" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
            <div className="field">
              <label htmlFor="password">New password</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <span className="form-note">At least 8 characters.</span>
            </div>

            {error && <p style={{ color: "var(--color-tomato)", fontSize: "0.9rem" }}>{error}</p>}

            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
