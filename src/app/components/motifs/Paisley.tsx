import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../../lib/motion";

const PAISLEY_D =
  "M52 132 C 12 104, 8 44, 46 24 C 80 7, 96 44, 74 62 C 62 72, 46 64, 52 52 C 55 46, 64 48, 63 54";

/**
 * Kashmiri buta (paisley) — a single teardrop that unfurls (stroke draw-on) when
 * it scrolls into view. A low-opacity watermark; never tiled. Reduced-motion
 * shows the completed form.
 */
export function Paisley({
  className = "",
  color = "var(--gold)",
  opacity = 0.5,
  strokeWidth = 1.5,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 140"
      fill="none"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <motion.path
        d={PAISLEY_D}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE.enter }}
      />
    </svg>
  );
}
