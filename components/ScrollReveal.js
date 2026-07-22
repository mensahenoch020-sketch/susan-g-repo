"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps children and adds a class once the element scrolls into view,
 * triggering a CSS transition (see .reveal / .reveal--visible in
 * globals.css). Respects prefers-reduced-motion automatically since
 * the CSS transition duration collapses to ~0 under that setting.
 */
export default function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
