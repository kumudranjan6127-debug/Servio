import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "motion/react";
import { SPLASH_Z_INDEX, type LoadingPhase } from "../constants/splash";

interface SplashScreenProps {
  phase: LoadingPhase;
  label: string;
  progress: number;
  isError: boolean;
  reducedMotion: boolean;
  onRetry: () => void;
}

const ENTRANCE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Warm black-granite ground (never the cold indigo of a SaaS loader).
const OVERLAY_BG =
  "radial-gradient(125% 125% at 50% 28%, #1b1712 0%, #100d0a 55%, #080604 100%)";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Metals (literal — the splash scene is always dark, so it owns its palette).
const BRASS = "#C9A227";
const BRASS_HI = "#E7CE7A";
const COPPER = "#B87333";

// Lotus petal paths (200×200 viewBox, bloom origin = centre 100,100, tip up).
const PETAL_OUTER = "M100 100 C 79 71, 83 37, 100 19 C 117 37, 121 71, 100 100 Z";
const PETAL_INNER = "M100 100 C 87 80, 89 55, 100 43 C 111 55, 113 80, 100 100 Z";
const OUTER_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const INNER_ANGLES = OUTER_ANGLES.map((a) => a + 22.5);

function Petal({
  d,
  angle,
  fill,
  stroke,
  delay,
  reduced,
}: {
  d: string;
  angle: number;
  fill: string;
  stroke: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={0.8}
      style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
      initial={reduced ? false : { rotate: angle * 0.18, scale: 0.5, opacity: 0 }}
      animate={{ rotate: angle, scale: 1, opacity: 1 }}
      transition={reduced ? { duration: 0 } : { delay, duration: 0.95, ease: ENTRANCE_EASE }}
    />
  );
}

/** Geometric lotus that unfolds over sacred-geometry rings; the mark emerges from the centre. */
function LotusMark({ reduced }: { reduced: boolean }) {
  const ring = (r: number, delay: number, opacity: number) => (
    <motion.circle
      cx={100}
      cy={100}
      r={r}
      fill="none"
      stroke={BRASS}
      strokeWidth={0.6}
      strokeOpacity={opacity}
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: opacity }}
      transition={reduced ? { duration: 0 } : { delay, duration: 1, ease: ENTRANCE_EASE }}
    />
  );

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-56 w-56 md:h-64 md:w-64"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="petalGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5ECD6" stopOpacity="0.34" />
          <stop offset="45%" stopColor={BRASS} stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F5ECD6" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="petalCopper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5ECD6" stopOpacity="0.24" />
          <stop offset="100%" stopColor={COPPER} stopOpacity="0.10" />
        </linearGradient>
        <radialGradient id="lotusSeed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BRASS_HI} />
          <stop offset="60%" stopColor={BRASS} />
          <stop offset="100%" stopColor={COPPER} stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Sacred geometry — concentric rings + 12 radial ticks, drawn in. */}
      {ring(92, 0.1, 0.25)}
      {ring(70, 0.25, 0.18)}
      {ring(48, 0.4, 0.14)}
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={reduced ? { duration: 0 } : { delay: 0.5, duration: 0.6 }}
      >
        {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
          <line
            key={a}
            x1={100}
            y1={8}
            x2={100}
            y2={14}
            stroke={BRASS}
            strokeWidth={0.7}
            transform={`rotate(${a} 100 100)`}
          />
        ))}
      </motion.g>

      {/* Outer lotus ring. */}
      {OUTER_ANGLES.map((a, i) => (
        <Petal
          key={`o${a}`}
          d={PETAL_OUTER}
          angle={a}
          fill="url(#petalGlass)"
          stroke={BRASS}
          delay={0.45 + i * 0.06}
          reduced={reduced}
        />
      ))}
      {/* Inner lotus ring (offset, copper-tinted, opens slightly later). */}
      {INNER_ANGLES.map((a, i) => (
        <Petal
          key={`i${a}`}
          d={PETAL_INNER}
          angle={a}
          fill="url(#petalCopper)"
          stroke={COPPER}
          delay={0.7 + i * 0.06}
          reduced={reduced}
        />
      ))}

      {/* The mark emerges from the centre once the bloom completes. */}
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
        initial={reduced ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 1.25, duration: 0.6, ease: ENTRANCE_EASE }}
      >
        <circle cx={100} cy={100} r={15} fill="url(#lotusSeed)" />
        <circle cx={100} cy={100} r={15} fill="none" stroke={BRASS_HI} strokeWidth={0.8} strokeOpacity={0.8} />
        {/* Tiny seed-of-life dots for fine detail. */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={100} cy={92} r={1.4} fill="#1b1712" transform={`rotate(${a} 100 100)`} />
        ))}
      </motion.g>

      {/* Liquid-glass sheen — a slow highlight drifting across the bloom. */}
      {!reduced && (
        <motion.ellipse
          cx={78}
          cy={66}
          rx={30}
          ry={52}
          fill="#FFFFFF"
          opacity={0.06}
          style={{ mixBlendMode: "screen" }}
          animate={{ cx: [78, 122, 78], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
      )}
    </svg>
  );
}

export function SplashScreen({
  phase,
  label,
  progress,
  isError,
  reducedMotion,
  onRetry,
}: SplashScreenProps) {
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const r = reducedMotion;

  useEffect(() => {
    if (!isError) return;
    retryButtonRef.current?.focus();
    const onFocusIn = (event: FocusEvent) => {
      const overlay = overlayRef.current;
      if (overlay && event.target instanceof Node && !overlay.contains(event.target)) {
        retryButtonRef.current?.focus();
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [isError]);

  const overlayVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      y: r ? 0 : -16,
      willChange: "transform, opacity",
      transition: { duration: r ? 0.2 : 0.9, ease: EXIT_EASE },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: r ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: r ? 0.2 : 0.5, ease: ENTRANCE_EASE } },
  };

  const floatTransition: Transition | undefined = r
    ? undefined
    : { duration: 7, repeat: Infinity, ease: "easeInOut" };

  const ariaProps: HTMLMotionProps<"div"> = isError
    ? {
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": "splash-error-title",
        "aria-describedby": "splash-error-desc",
      }
    : { "aria-busy": phase !== "ready", "aria-label": "Loading Servio" };

  const fillScale = Math.min(1, Math.max(0, progress / 100));

  return (
    <motion.div
      ref={overlayRef}
      {...ariaProps}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onKeyDown={(event) => {
        if (!isError) return;
        if (event.key === "Tab") event.preventDefault();
        else if (event.key === "Escape") onRetry();
      }}
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{
        zIndex: SPLASH_Z_INDEX,
        background: OVERLAY_BG,
        pointerEvents: phase === "ready" ? "none" : "auto",
      }}
    >
      {/* Warm brass aura behind the bloom + vignette + grain (all transform/opacity). */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {!r && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(201,162,39,0.14), transparent 62%)" }}
            animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.6) 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN_URL }}
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        {isError ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#C9A227]/25 bg-white/[0.04] px-7 py-8 backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A227]/30 bg-white/5 text-2xl"
            >
              ⚠️
            </div>
            <h2 id="splash-error-title" className="text-lg font-semibold text-[#F4ECD8] md:text-xl">
              {label}
            </h2>
            <p id="splash-error-desc" className="text-xs text-[#C9BCA0] md:text-sm">
              Please check your connection and try again.
            </p>
            <button
              ref={retryButtonRef}
              type="button"
              onClick={onRetry}
              className="mt-1 rounded-xl border border-[#C9A227]/40 px-5 py-2 text-sm font-medium text-[#F4ECD8] transition-colors hover:bg-[#C9A227]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              style={{ background: "linear-gradient(180deg, rgba(201,162,39,0.18), rgba(184,115,51,0.10))" }}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <motion.div animate={r ? undefined : { y: [0, -8, 0] }} transition={floatTransition}>
              <LotusMark reduced={r} />
            </motion.div>

            <motion.span
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: r ? 0 : 1.45 }}
              className="-mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl"
              style={{
                backgroundImage: "linear-gradient(180deg, #F4ECD8 0%, #E7CE7A 55%, #C9A227 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Servio
            </motion.span>

            <motion.p
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: r ? 0 : 1.6 }}
              className="mt-2 text-xs tracking-[0.18em] text-[#B6A988] uppercase md:text-sm"
            >
              Crafted in India
            </motion.p>

            <motion.div
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: r ? 0 : 1.75 }}
              className="mt-6 w-full max-w-[180px]"
            >
              <div
                role="progressbar"
                aria-label="Loading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-[3px] w-full overflow-hidden rounded-full bg-[#C9A227]/15"
              >
                <motion.div
                  className="h-full origin-left rounded-full"
                  style={{
                    transformOrigin: "left",
                    background: "linear-gradient(90deg, #B87333, #C9A227, #E7CE7A)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: fillScale }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              <div role="status" aria-live="polite" aria-atomic="true" className="mt-3 flex h-5 items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: r ? 0 : 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: r ? 0 : -4 }}
                    transition={{ duration: r ? 0.15 : 0.25 }}
                    className="text-xs tracking-wide text-[#B6A988]"
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
