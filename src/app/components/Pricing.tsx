import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { TypingText } from './TypingText';
import { Check, Star } from 'lucide-react';
import { scrollToSection } from '../lib/scrollToSection';
import { GlassPanel } from './GlassPanel';
import { Aurora } from './Aurora';
import { Reveal } from './motion/Reveal';
import { EASE, DUR } from '../lib/motion';
import { cn } from './ui/utils';

const plans = [
  {
    name: 'Starter',
    price: '₹7999– ₹25,000',
    priceText: 'Project-based Pricing',
    description: 'Perfect for small businesses and startups',
    features: [
      'Single Landing Page',
      'Mobile Responsive Design',
      'Basic SEO Optimization',
      'Contact Form Integration',
      '2 Revisions Included',
      '1 Week Delivery',
    ],
    highlighted: false,
  },
  {
    name: 'Business',
    price: '₹65,000 – ₹1,20,000',
    priceText: 'Project-based Pricing',
    description: 'Most popular for growing businesses',
    features: [
      'Multi-page Website (Up to 5 pages)',
      'CMS Integration',
      'Advanced SEO & Analytics',
      'E-commerce Ready',
      'Custom Functionality',
      '5 Revisions Included',
      'Priority Support',
      '2 Week Delivery',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '₹1,60,000 – ₹2,00,000',
    priceText: 'Project-based Pricing',
    description: 'For complex web applications',
    features: [
      'Custom Web Application',
      'Advanced Features & Integrations',
      'User Authentication',
      'Database Design',
      'API Development',
      'Unlimited Revisions',
      'Dedicated Project Manager',
      '4 Week Delivery',
      '3 Months Free Support',
    ],
    highlighted: false,
  },
];

const TILT_SPRING = { stiffness: 200, damping: 20, mass: 0.5 } as const;

/** Tilt + hover-lift are disabled on touch screens. */
function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

function PlanCard({
  plan,
  index,
  reduce,
}: {
  plan: (typeof plans)[number];
  index: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { highlighted } = plan;

  // Pointer-driven tilt + a small lift while hovered (springy, centred at rest).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const lift = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), TILT_SPRING);
  const liftY = useSpring(lift, TILT_SPRING);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || isCoarsePointer()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    lift.set(-8);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
  };

  return (
    <motion.div
      className={cn('relative h-full', highlighted && 'md:-mt-4 md:mb-4')}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0 : DUR.base, delay: reduce ? 0 : index * 0.1, ease: EASE.enter }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, y: liftY, transformPerspective: 900 }}
        className="relative h-full [transform-style:preserve-3d] will-change-transform"
      >
        {/* Featured tier: a slowly-rotating conic-gradient liquid border. */}
        {highlighted && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[1.5px] overflow-hidden rounded-[calc(var(--radius)+2px)]"
          >
            <div
              className="animate-mandala absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--gold) 85%, transparent) 60deg, var(--gold-light) 120deg, transparent 220deg, transparent 360deg)',
              }}
            />
          </div>
        )}

        <GlassPanel
          tier={highlighted ? 'strong' : 'base'}
          tint={highlighted ? 'var(--gold)' : undefined}
          className={cn('relative flex h-full flex-col p-8', highlighted ? 'shadow-elev-4' : 'shadow-elev-2')}
        >
          {/* Popular Badge */}
          {highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 rounded-full bg-grad-brand px-4 py-1.5 text-sm font-semibold text-white shadow-elev-2">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                Most Popular
              </div>
            </div>
          )}

          <div className="mb-8 text-center">
            <h3 className="mb-2 font-display text-2xl font-semibold">{plan.name}</h3>
            <p className="mb-6 text-sm opacity-70">{plan.description}</p>
            <div className="mb-2">
              <span className="text-gradient-brand nums-tabular text-3xl font-bold xl:text-4xl">
                {plan.price}
              </span>
            </div>
            <p className="text-sm opacity-60">{plan.priceText}</p>
          </div>

          <ul className="mb-8 space-y-4">
            {plan.features.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-start gap-3"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : DUR.fast,
                  delay: reduce ? 0 : 0.15 + i * 0.05,
                  ease: EASE.enter,
                }}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                    highlighted ? 'bg-primary' : 'bg-primary/10',
                  )}
                >
                  <Check
                    className={cn('h-3 w-3', highlighted ? 'text-white' : 'text-primary')}
                    aria-hidden="true"
                  />
                </span>
                <span className="opacity-90">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <button
            onClick={() => scrollToSection('contact')}
            className={cn(
              'mt-auto w-full rounded-full px-6 py-3 font-semibold transition-all duration-300',
              highlighted
                ? 'bg-grad-brand text-white hover:scale-[1.03] hover:[box-shadow:0_0_28px_-4px_var(--gold)]'
                : 'bg-foreground/5 text-foreground hover:bg-foreground/10',
            )}
          >
            Get Started
          </button>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}

export function Pricing() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Sandstone paper-grain — tactile stone, barely-there in both modes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Aurora intensity={0.5} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center">
          <span className="eyebrow text-primary">Pricing</span>
          <h2
            id="pricing-title"
            className="mt-3 mb-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            Simple,{' '}
            <span className="text-gradient-brand">
              <TypingText text="Transparent Pricing" delay={150} cursorColor="bg-primary" />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Choose the perfect plan for your business. All plans include a 30-day money-back
            guarantee.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} reduce={!!reduce} />
          ))}
        </div>

        {/* Custom Quote CTA */}
        <Reveal className="mt-16 text-center">
          <GlassPanel tier="base" className="mx-auto inline-block max-w-xl px-8 py-6">
            <h3 className="mb-2 font-display text-xl font-semibold">Need a custom solution?</h3>
            <p className="mb-6 opacity-70">
              We build enterprise-grade applications tailored to your specific needs.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
            >
              Contact us for a custom quote →
            </button>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
