import { motion, useReducedMotion } from "motion/react";
import { GlassPanel } from "./GlassPanel";
import { ZariHairline } from "./motifs";

// The tools and frameworks we build with. These are technologies we use —
// not partners or clients — so the heading deliberately avoids implying any
// endorsement or relationship with these companies.
const tools = [
  "React",
  "Next.js",
  "Tailwind",
  "Vercel",
  "Stripe",
  "Figma",
  "Supabase",
  "Framer",
];

// Soft edge fade so the rail dissolves into the glass instead of hard-clipping.
const EDGE_FADE =
  "linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)";

function ToolWord({ label }: { label: string }) {
  return (
    <span className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/55 transition-colors duration-300 hover:text-foreground">
      {label}
    </span>
  );
}

export function TrustedBy() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.4 }}
          className="eyebrow mb-8 text-center text-muted-foreground"
        >
          Built with modern tools
        </motion.p>

        {/* Continuous glass marquee rail — one material, masked end-fades,
            a faint travelling sheen, and zari-thread end-caps. */}
        <GlassPanel
          tier="thin"
          className="relative overflow-hidden py-4"
          style={{ borderRadius: 9999 }}
        >
          {/* Masked viewport: content dissolves at both ends. */}
          <div
            className="overflow-hidden"
            style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
          >
            {reduce ? (
              // Reduced motion → a static, horizontally-scrollable, keyboard-
              // reachable row so every tool stays reachable without animation.
              <ul
                tabIndex={0}
                aria-label="Tools and frameworks we build with"
                className="flex items-center gap-12 overflow-x-auto px-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {tools.map((t) => (
                  <li key={t}>
                    <ToolWord label={t} />
                  </li>
                ))}
              </ul>
            ) : (
              // Two identical rows; translating the track by exactly one row
              // width (-50%) loops seamlessly. Trailing gap == inter-item gap.
              <div
                tabIndex={0}
                role="group"
                aria-label="Tools and frameworks we build with — hover or focus to pause"
                className="marquee-pause rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <div className="marquee-rail flex w-max">
                  <ul className="flex shrink-0 items-center gap-12 pr-12">
                    {tools.map((t) => (
                      <li key={t}>
                        <ToolWord label={t} />
                      </li>
                    ))}
                  </ul>
                  <ul aria-hidden className="flex shrink-0 items-center gap-12 pr-12">
                    {tools.map((t) => (
                      <li key={`dup-${t}`}>
                        <ToolWord label={t} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Faint travelling sheen (decorative; off when motion is reduced). */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--gold)]/12 to-transparent"
              initial={{ x: "-160%" }}
              animate={{ x: "560%" }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
            />
          )}

          {/* Zari (gold-thread) end-caps. */}
          <div className="pointer-events-none absolute inset-y-3 left-5 w-px opacity-70">
            <ZariHairline vertical />
          </div>
          <div className="pointer-events-none absolute inset-y-3 right-5 w-px opacity-70">
            <ZariHairline vertical />
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
