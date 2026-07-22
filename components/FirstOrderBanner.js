"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function FirstOrderBanner() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="first-order-banner">
        <span className="first-order-banner__icon" aria-hidden="true">
          🎉
        </span>
        <p>
          <strong>Enjoy $0 delivery fee on your first order.</strong>{" "}
          <Link href="/account/signup" className="first-order-banner__link">
            Sign up
          </Link>{" "}
          before you check out and it&rsquo;s applied automatically on your
          first delivery order.
        </p>
      </div>
    );
  }

  if (!user.hasOrdered) {
    return (
      <div className="first-order-banner">
        <span className="first-order-banner__icon" aria-hidden="true">
          🎉
        </span>
        <p>
          <strong>You&rsquo;re all set, {user.name ? user.name.split(" ")[0] : "there"}!</strong>{" "}
          Choose Delivery at checkout and your $0 first-order delivery fee
          will be applied automatically.
        </p>
      </div>
    );
  }

  return null;
}
