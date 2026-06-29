import { useReducedMotion } from "motion/react";

export interface AuroraProps {
  className?: string;
  /** Overall opacity of the field (0–1). */
  intensity?: number;
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Tokenised aurora background — three drifting brand-coloured blobs + grain to
 * kill blur banding. Absolutely positioned; drop into a `relative` section.
 * Drift is reduced-motion gated (and the site-wide CSS gate neutralises it too).
 */
export function Aurora({ className = "", intensity = 1 }: AuroraProps) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className={`absolute -top-1/3 -left-1/4 h-[60vmax] w-[60vmax] rounded-full blur-3xl ${reduce ? "" : "animate-aurora-1"}`}
        style={{ background: "radial-gradient(circle at center, var(--aurora-1), transparent 60%)" }}
      />
      <div
        className={`absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full blur-3xl ${reduce ? "" : "animate-aurora-2"}`}
        style={{ background: "radial-gradient(circle at center, var(--aurora-2), transparent 60%)" }}
      />
      <div
        className={`absolute top-1/4 right-1/3 h-[42vmax] w-[42vmax] rounded-full blur-3xl ${reduce ? "" : "animate-aurora-3"}`}
        style={{ background: "radial-gradient(circle at center, var(--aurora-3), transparent 60%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
    </div>
  );
}
