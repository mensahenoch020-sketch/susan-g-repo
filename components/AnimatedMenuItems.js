'use client';

import styles from './AnimatedMenuItems.module.css';

/**
 * AnimatedMenuItems — wrapper to add smooth animations to menu items
 * Features:
 * - Staggered entrance animations
 * - Smooth hover state transitions
 * - Food emoji animation on hover
 */

export default function AnimatedMenuItems({ children, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}
