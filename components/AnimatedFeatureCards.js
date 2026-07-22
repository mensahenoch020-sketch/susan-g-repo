'use client';

import styles from './AnimatedFeatureCards.module.css';

/**
 * AnimatedFeatureCards — wraps feature cards with stagger animations
 * Automatically assigns stagger delays
 */

export default function AnimatedFeatureCards({ children, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}
