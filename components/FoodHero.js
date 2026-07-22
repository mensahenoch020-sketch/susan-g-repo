'use client';

import { useEffect, useState } from 'react';
import styles from './FoodHero.module.css';

/**
 * FoodHero — animated hero section with floating food elements
 * Features:
 * - Animated floating food icons
 * - Steam/heat effects
 * - Smooth parallax on scroll
 * - Accessible and respects prefers-reduced-motion
 */

const FoodItems = [
  { emoji: '🍽️', delay: 0, duration: 6 },
  { emoji: '🥘', delay: 1, duration: 7 },
  { emoji: '🍲', delay: 2, duration: 5.5 },
  { emoji: '🥗', delay: 0.5, duration: 6.5 },
  { emoji: '🍗', delay: 1.5, duration: 7.5 },
];

export default function FoodHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.foodHero}>
      {/* Animated background gradient with radial overlays */}
      <div className={styles.background} />

      {/* Floating food particles */}
      <div className={styles.floatingContainer} aria-hidden="true">
        {FoodItems.map((item, idx) => (
          <div
            key={idx}
            className={styles.floatingItem}
            style={{
              '--delay': `${item.delay}s`,
              '--duration': `${item.duration}s`,
              '--offset': `${scrollY * 0.3}px`,
            }}
          >
            <span className={styles.emoji}>{item.emoji}</span>
          </div>
        ))}
      </div>

      {/* Steam/heat effect circles */}
      <div className={styles.steamContainer} aria-hidden="true">
        <div className={`${styles.steam} ${styles.steam1}`} />
        <div className={`${styles.steam} ${styles.steam2}`} />
        <div className={`${styles.steam} ${styles.steam3}`} />
      </div>

      {/* Pulse rings (food freshness indicator) */}
      <div className={styles.pulseRings} aria-hidden="true">
        <div className={styles.ring} />
        <div className={styles.ring} style={{ '--delay': '1s' }} />
        <div className={styles.ring} style={{ '--delay': '2s' }} />
      </div>

      {/* Content overlay with fade-in on scroll */}
      <div 
        className={styles.content}
        style={{ opacity: Math.max(1 - scrollY / 400, 0.7) }}
      >
        <div className={styles.accent}>Fresh & Hot</div>
        <h2 className={styles.subtitle}>Made to order, delivered to you</h2>
      </div>
    </div>
  );
}
