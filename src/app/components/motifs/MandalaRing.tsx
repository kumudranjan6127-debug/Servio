import { useReducedMotion } from "motion/react";

const PETALS = Array.from({ length: 12 }, (_, i) => i * 30);
const DOTS = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * Mandala / charkha ring — abstracted radial geometry (NOT a sacred symbol).
 * Two counter-rotating rings of petals + dots. Use as a decorative accent or a
 * calm loader. Spin is reduced-motion gated.
 */
export function MandalaRing({
  className = "",
  size = 120,
  color = "var(--gold)",
  spin = true,
  strokeWidth = 1,
}: {
  className?: string;
  size?: number;
  color?: string;
  spin?: boolean;
  strokeWidth?: number;
}) {
  const reduce = useReducedMotion();
  const animate = spin && !reduce;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      className={`pointer-events-none ${className}`}
    >
      <g className={animate ? "animate-mandala" : undefined}>
        {PETALS.map((a) => (
          <ellipse key={a} cx="50" cy="18" rx="3.5" ry="11" transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="30" opacity={0.5} />
      </g>
      <g className={animate ? "animate-mandala-rev" : undefined}>
        {DOTS.map((a) => (
          <circle key={a} cx="50" cy="38" r="1.6" fill={color} stroke="none" transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="6" />
      </g>
    </svg>
  );
}
