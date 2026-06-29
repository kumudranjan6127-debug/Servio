import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode, CSSProperties } from "react";
import { EASE, DUR, DIST, STAGGER } from "../../lib/motion";

interface BaseProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * The one reveal vocabulary: a rise + fade in on scroll-into-view. Replaces the
 * ~20 copy-pasted `whileInView` blocks. Reduced-motion collapses to a plain
 * fade (no travel, zero duration).
 */
export function Reveal({
  children,
  className,
  style,
  id,
  delay = 0,
  dist = DIST.md,
  once = true,
}: BaseProps & { delay?: number; dist?: number; once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : dist }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: reduce ? 0 : DUR.base, ease: EASE.enter, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent that staggers its <RevealItem> children — replaces every
 * `delay: index * 0.1` hand-stagger.
 */
export function RevealGroup({
  children,
  className,
  style,
  id,
  stagger = STAGGER,
  once = true,
}: BaseProps & { stagger?: number; once?: boolean }) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : 0.05 } },
  };
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
  id,
  dist = DIST.md,
}: BaseProps & { dist?: number }) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : dist },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : DUR.base, ease: EASE.enter } },
  };
  return (
    <motion.div id={id} className={className} style={style} variants={item}>
      {children}
    </motion.div>
  );
}
