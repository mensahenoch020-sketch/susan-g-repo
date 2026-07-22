"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AccountMenu() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div style={{ width: 40, height: 40 }} aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link href="/account/login" className="account-menu__trigger" aria-label="Log in or sign up">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 20c1.4-3.6 4.5-5.5 7.5-5.5s6.1 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </Link>
    );
  }

  return (
    <div className="account-menu" ref={ref}>
      <button
        className="account-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 20c1.4-3.6 4.5-5.5 7.5-5.5s6.1 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="account-menu__dropdown">
          {user.name && (
            <div style={{ padding: "8px 12px", fontSize: "0.85rem", color: "rgba(32,27,23,0.55)" }}>
              Hi, {user.name.split(" ")[0]}
            </div>
          )}
          <Link href="/account/orders" onClick={() => setOpen(false)}>
            Order History
          </Link>
          <button onClick={() => { logout(); setOpen(false); }}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
