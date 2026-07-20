import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1 style={{ marginTop: 12 }}>Looks like this page isn&rsquo;t on the menu.</h1>
        <p style={{ maxWidth: 480, margin: "0 auto 28px", color: "rgba(32,27,23,0.7)" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist. Head back
          home or check out our menu instead.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--dark">
            Back to Home
          </Link>
          <Link href="/menu" className="btn btn--outline">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
