import { motion, useReducedMotion } from 'motion/react';
import { TypingText } from './TypingText';
import { ClipboardList, Palette, Code2, Rocket } from 'lucide-react';
import { Aurora } from './Aurora';
import { KolamDraw, MandalaRing } from './motifs';
import { Reveal } from './motion/Reveal';
import { EASE, DUR, STAGGER } from '../lib/motion';

const steps = [
  {
    icon: ClipboardList,
    title: 'Requirement Collection',
    description: 'We start by understanding your business goals, target audience, and project requirements.',
    color: 'from-[var(--copper)] to-[var(--terracotta)]',
  },
  {
    icon: Palette,
    title: 'Design & Planning',
    description: 'Our designers create beautiful mockups and wireframes tailored to your brand.',
    color: 'from-[var(--terracotta)] to-[var(--sindoor)]',
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'We build your website with clean, scalable code following best practices.',
    color: 'from-[var(--peacock)] to-[var(--primary)]',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We deploy your website and provide ongoing support to ensure smooth operation.',
    color: 'from-[var(--saffron)] to-[var(--haldi)]',
  },
];

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="process-title"
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-card"
    >
      <Aurora intensity={0.5} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="text-center mb-16">
          <span className="eyebrow text-primary">Our Process</span>
          <h2
            id="process-title"
            className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4"
          >
            How We{' '}
            <span className="text-gradient-brand">
              <TypingText text="Work" delay={150} cursorColor="bg-primary" />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined process designed to deliver exceptional results on time and on budget.
          </p>
        </Reveal>

        <div className="relative">
          {/* Scroll-drawn kolam thread connecting the steps (lg+). KolamDraw ties its
              own pathLength to scroll progress and renders the full static path under
              reduced-motion — replaces the old flat gradient connector line. */}
          <div className="hidden lg:block pointer-events-none absolute inset-x-12 top-0 h-24">
            <KolamDraw className="h-full w-full" stroke="var(--gold)" strokeWidth={1.5} />
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={reduce ? 0 : index * STAGGER} className="relative">
                {/* Diya node — lights up as the step reveals */}
                <div className="flex justify-center mb-6">
                  <div className="relative flex items-center justify-center">
                    {/* Mandala accent that scales in around the tile */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center"
                      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                      transition={{
                        duration: reduce ? 0 : DUR.slow,
                        ease: EASE.enter,
                        delay: reduce ? 0 : index * STAGGER + 0.15,
                      }}
                    >
                      <MandalaRing size={104} color="var(--gold)" className="opacity-50" />
                    </motion.span>

                    {/* Gold diya glow that pulses in (motion-gated → static under reduced-motion) */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          'radial-gradient(circle, color-mix(in oklch, var(--gold) 60%, transparent), transparent 70%)',
                        filter: 'blur(14px)',
                      }}
                      initial={{ opacity: reduce ? 0.45 : 0 }}
                      whileInView={{ opacity: reduce ? 0.45 : [0, 0.9, 0.55] }}
                      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                      transition={{
                        duration: reduce ? 0 : DUR.slow,
                        ease: EASE.enter,
                        delay: reduce ? 0 : index * STAGGER + 0.15,
                      }}
                    />

                    {/* Icon tile */}
                    <div
                      className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-elev-2`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-background text-primary text-sm font-bold flex items-center justify-center shadow-elev-1 ring-1 ring-gold/40 nums-tabular">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Glass step card */}
                <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
