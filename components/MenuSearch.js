"use client";

import { useMemo, useState } from "react";
import MenuSection from "@/components/MenuSection";

function matchesQuery(item, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [item.name, item.desc, ...(item.tags || [])]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export default function MenuSearch({ categories }) {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => matchesQuery(item, query)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query]);

  const totalResults = filteredCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <>
      <div className="menu-search">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search the menu — burgers, chicken, drinks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the menu"
        />
        {query && (
          <button
            className="menu-search__clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {query.trim() && (
        <p className="menu-search__results-note">
          {totalResults === 0
            ? `No menu items matched "${query}".`
            : `Showing ${totalResults} result${totalResults === 1 ? "" : "s"} for "${query}"`}
        </p>
      )}

      {filteredCategories.map((cat) => (
        <MenuSection
          key={cat.title}
          title={cat.title}
          note={cat.note}
          items={cat.items}
        />
      ))}
    </>
  );
}
