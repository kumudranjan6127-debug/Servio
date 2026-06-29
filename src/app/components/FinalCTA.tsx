import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { SmoothLink } from "./SmoothLink";
import { MagneticButton } from "./MagneticButton";
import { KolamDots, MandalaRing } from "./motifs";
import { scrollToSectionFromAnyRoute } from "../lib/scrollToSection";

export function FinalCTA() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-elev-4"
        >
          {/* Brand gradient ground */}
          <div className="absolute inset-0 bg-grad-brand" />

          {/* Slow-drifting liquid blobs (reduced-motion gated via global CSS) */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold-light/20 rounded-full blur-3xl animate-aurora-1" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent/25 rounded-full blur-3xl animate-aurora-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-40 bg-secondary/30 rounded-full blur-3xl animate-aurora-3" />

          {/* Kolam dot-field (replaces the plain radial grid) */}
          <KolamDots
            className="absolute inset-0"
            color="var(--gold-light)"
            opacity={0.12}
            size={30}
          />

          {/* Faint rotating mandala backdrop (spin self-gates on reduced-motion) */}
          <MandalaRing
            size={520}
            color="var(--gold-light)"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
          />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.span
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.1 }}
              className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium">Ready to get started?</span>
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Let's Build Your{" "}
              <span className="text-gold-light">Next Website</span>
            </h2>

            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Partner with Servio to deliver a stunning, conversion-focused website. Get your free proposal today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                type="button"
                onClick={() => scrollToSectionFromAnyRoute("contact", navigate, pathname)}
                className="group gap-3 rounded-2xl px-8 py-4 font-bold text-primary shadow-elev-3 hover:-translate-y-0.5"
                style={{ background: "var(--card)" }}
              >
                {/* zari (gold thread) sheen along the top edge */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"
                />
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <SmoothLink
                to="portfolio"
                className="glass inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Our Work
              </SmoothLink>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/15">
              {["Free proposal within 24h", "No upfront payment", "30-day satisfaction guarantee"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
