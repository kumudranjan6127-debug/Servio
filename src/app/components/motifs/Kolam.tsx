import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/** A continuous unbroken thread — the kolam/vine signature. */
const DEFAULT_KOLAM =
  "M6 60 C 40 6, 72 6, 100 60 S 160 114, 196 60 S 256 6, 296 60 S 356 114, 394 60";

/**
 * Tamil-Nadu kolam dot-field — a near-zero-cost CSS background of evenly spaced
 * dots. Use as a section ground or behind glass.
 */
export function KolamDots({
  className = "",
  size = 24,
  color = "var(--gold)",
  opacity = 0.45,
}: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.6px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

/**
 * The single unbroken loop that draws itself as it scrolls into view (the
 * rangoli "draw-on"). Reduced-motion renders the completed path.
 */
export function KolamDraw({
  className = "",
  stroke = "var(--gold)",
  strokeWidth = 1.5,
  d = DEFAULT_KOLAM,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  d?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        className="h-full w-full"
      >
        <motion.path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}
