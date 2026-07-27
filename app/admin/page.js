"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/menu-data";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user || !user.isAdmin) return;

    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      })
      .catch(() => setError("Could not load admin data."));
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <section className="section">
        <div className="wrap">
          <p>Loading…</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 480 }}>
          <span className="eyebrow">Admin</span>
          <h1 style={{ marginTop: 12 }}>Log in required.</h1>
          <Link href="/account/login" className="btn btn--primary" style={{ marginTop: 16 }}>
            Log In
          </Link>
        </div>
      </section>
    );
  }

  if (!user.isAdmin) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 480 }}>
          <span className="eyebrow">Admin</span>
          <h1 style={{ marginTop: 12 }}>Not authorized.</h1>
          <p style={{ color: "rgba(32,27,23,0.7)" }}>
            This account doesn&rsquo;t have admin access.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <span className="eyebrow">Admin</span>
        <h1 style={{ marginTop: 12 }}>Dashboard.</h1>

        {error && <p style={{ color: "var(--color-tomato)" }}>{error}</p>}
        {!data && !error && <p>Loading…</p>}

        {data && (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span className="admin-stat-card__label">Total Revenue</span>
                <span className="admin-stat-card__value">
                  {formatPrice(data.stats.totalRevenue)}
                </span>
                <span className="admin-stat-card__note">From paid orders</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-card__label">Total Orders</span>
                <span className="admin-stat-card__value">{data.stats.totalOrders}</span>
                <span className="admin-stat-card__note">{data.stats.paidOrders} paid</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-card__label">Customers</span>
                <span className="admin-stat-card__value">{data.stats.uniqueCustomers}</span>
                <span className="admin-stat-card__note">Unique accounts</span>
              </div>
            </div>

            <h2 style={{ fontSize: "1.3rem", marginTop: 40, marginBottom: 16 }}>
              All Orders
            </h2>

            {data.orders.length === 0 ? (
              <p style={{ color: "rgba(32,27,23,0.6)" }}>No orders yet.</p>
            ) : (
              <div className="admin-orders-table-wrap">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Method</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((order) => (
                      <tr key={order.id}>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{order.customerName || order.customerEmail}</td>
                        <td>
                          {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                        </td>
                        <td>
                          {order.fulfillmentMethod === "delivery"
                            ? `Delivery (${order.deliveryZip || "—"})`
                            : "Pickup"}
                        </td>
                        <td>{formatPrice(order.total)}</td>
                        <td>
                          <span className={`order-status order-status--${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
