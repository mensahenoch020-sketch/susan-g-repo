/**
 * Placeholder food visual block.
 *
 * These are styled color blocks standing in for real photography.
 * Replace them with actual photos of your food by adding images to
 * /public/images and swapping this component's usage for a Next.js
 * <Image> tag — see README.md for instructions.
 */
export default function FoodVisual({ variant = 1, label, tall = false }) {
  return (
    <div
      className={`food-visual fv-${variant}`}
      style={tall ? { aspectRatio: "3 / 4" } : undefined}
      role="img"
      aria-label={label || "Food photo placeholder"}
    >
      {label && <span className="food-visual__label">{label}</span>}
    </div>
  );
}
