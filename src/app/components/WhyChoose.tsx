import { motion, useReducedMotion } from "motion/react";
import { Zap, Palette, Search, Smartphone, Shield, Headphones } from "lucide-react";
import { Aurora } from "./Aurora";
import { Jali } from "./motifs";
import { Reveal } from "./motion/Reveal";
import { cn } from "./ui/utils";

/**
 * Unified accent palette — the old per-card rainbow collapses to two brand tones
 * (primary + peacock) plus a single saffron accent. Every class is a complete,
 * static string (light + `dark:` literals) so Tailwind can compile it.
 *
 * This is the fix for the previous `dark:${reason.bg.replace('50','900/30')}`
 * runtime-built class, which Tailwind never saw at build time, so dark icon
 * backgrounds silently never rendered.
 */
type Tone = "brand" | "peacock" | "saffron";

const TONES: Record<Tone, { iconBg: string; iconFg: string }> = {
  brand: { iconBg: "bg-primary/10 dark:bg-primary/25", iconFg: "text-primary" },
  peacock: { iconBg: "bg-peacock/10 dark:bg-peacock/25", iconFg: "text-peacock" },
  saffron: { iconBg: "bg-saffron/15 dark:bg-saffron/25", iconFg: "text-saffron" },
};

/** Sandstone paper-grain — fully percent-encoded so the data URI survives any
 *  bundler / CSS parser. Laid over the section at ~4% for tactile stone. */
const grainStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  backgroundSize: "120px",
};

const reasons: {
  icon: typeof Zap;
  title: string;
  description: string;
  tone: Tone;
}[] = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We ship your project on time, every time. Our streamlined process ensures quick turnarounds without compromising quality.",
    tone: "saffron",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Pixel-perfect designs that look stunning on every device, crafted to match your brand and impress your visitors.",
    tone: "brand",
  },
  {
    icon: Search,
    title: "SEO Ready",
    description: "Built with SEO best practices from the ground up — structured data, fast load times, and semantic HTML.",
    tone: "peacock",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Every project is mobile-first and fully responsive — flawless across phones, tablets, and desktops.",
    tone: "brand",
  },
  {
    icon: Shield,
    title: "Secure & Scalable",
    description: "Enterprise-grade security and architecture that grows with your business, no matter the traffic.",
    tone: "peacock",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "We're here after launch. Get priority support, updates, and maintenance to keep your site running perfectly.",
    tone: "brand",
  },
];

export function WhyChoose() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="why-choose-title"
      className="relative overflow-hidden py-20 md:py-32 bg-background"
    >
      <Aurora intensity={0.45} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--terracotta)]/5 to-transparent pointer-events-none" />
      {/* Sandstone paper-grain for tactile stone */}
      <div aria-hidden style={grainStyle} className="pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="text-center mb-16">
          <span className="eyebrow text-primary">Why Servio</span>
          <h2
            id="why-choose-title"
            className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4"
          >
            Why Businesses{" "}
            <span className="text-gradient-brand">Choose Us</span>
          </h2>
          {/* Brass underline-sweep — an engraved rule beneath the engraved-copper heading */}
          <span
            aria-hidden
            className="mx-auto mb-5 block h-px w-24 bg-gradient-to-r from-transparent via-[var(--brass)] to-transparent"
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with thoughtful design to deliver websites that perform.
          </p>
        </Reveal>

        <div className="relative">
          {/* Faint jali lattice behind the grid (≤6%) — the one heritage motif here. */}
          <Jali className="absolute inset-0" color="var(--gold)" opacity={0.06} />

          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => {
              const tone = TONES[reason.tone];
              return (
                <motion.div
                  key={reason.title}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: index * 0.08 }}
                  whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.2 } }}
                  className="group glass flex gap-5 p-6 rounded-2xl"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                      tone.iconBg,
                    )}
                  >
                    <reason.icon className={cn("w-6 h-6", tone.iconFg)} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
