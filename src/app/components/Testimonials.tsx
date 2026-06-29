import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { TypingText } from "./TypingText";
import { Reveal } from "./motion/Reveal";
import priya from "../../assets/testimonials/priya.jpg";
import arjun from "../../assets/testimonials/arjun.jpg";
import ananya from "../../assets/testimonials/ananya.jpg";
import rohan from "../../assets/testimonials/rohan.jpg";
import sneha from "../../assets/testimonials/sneha.jpg";
import vikram from "../../assets/testimonials/vikram.jpg";
import aishwarya from "../../assets/testimonials/aishwarya.jpg";
import karan from "../../assets/testimonials/karan.jpg";
import meera from "../../assets/testimonials/meera.jpg";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Mehta",
    role: "Creative Director",
    company: "Artisan Studio",
    avatar: priya,
    rating: 5,
    text: "The portfolio website Servio built for us is breathtaking. Every client who visits comments on how impressive and polished it looks. The attention to micro-interactions and detail is unmatched.",
  },
  {
    id: 2,
    name: "Arjun Sharma",
    role: "CEO",
    company: "TechStart India",
    avatar: arjun,
    rating: 5,
    text: "Servio transformed our online presence completely. Our new website loads in under 2 seconds and our conversion rate jumped by 47% within the first month. The team was incredibly professional and delivered ahead of schedule.",
  },
  {
    id: 3,
    name: "Ananya Iyer",
    role: "Founder",
    company: "Bloom Digital",
    avatar: ananya,
    rating: 5,
    text: "Working with Servio was seamless from start to finish. They took our rough ideas and turned them into a stunning e-commerce store that our customers love. Revenue increased 3x in just 60 days after launch.",
  },
  {
    id: 4,
    name: "Rohan Gupta",
    role: "COO",
    company: "CloudSync Labs",
    avatar: rohan,
    rating: 5,
    text: "We needed a complex SaaS dashboard built quickly. Servio delivered in 3 weeks with clean code, excellent documentation, and ongoing support that's been invaluable. Highly recommend.",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Marketing Lead",
    company: "Nova Retail",
    avatar: sneha,
    rating: 5,
    text: "Our campaign landing pages have never converted better. Servio's design sense paired with rock-solid performance gave us an instant lift in qualified leads. Truly a partner, not just a vendor.",
  },
  {
    id: 6,
    name: "Vikram Nair",
    role: "CTO",
    company: "Finch Analytics",
    avatar: vikram,
    rating: 5,
    text: "Clean architecture, thoughtful APIs, and a UI our customers genuinely enjoy using. Servio understood our product deeply and shipped exactly what we needed, on time and on budget.",
  },
  {
    id: 7,
    name: "Aishwarya Rao",
    role: "Product Manager",
    company: "Lotus Apps",
    avatar: aishwarya,
    rating: 5,
    text: "From discovery to launch, Servio felt like an extension of our own team. Our app's onboarding flow is now smooth and intuitive, and user retention has climbed steadily ever since.",
  },
  {
    id: 8,
    name: "Karan Malhotra",
    role: "Founder",
    company: "Vertex Studio",
    avatar: karan,
    rating: 5,
    text: "They rebuilt our marketing site from scratch and the difference is night and day. It's fast, beautiful, and finally reflects the quality of our work. Bookings are up 60%.",
  },
  {
    id: 9,
    name: "Meera Krishnan",
    role: "Head of Design",
    company: "Saffron Labs",
    avatar: meera,
    rating: 5,
    text: "As a design-led company we're picky, and Servio exceeded our bar. Every spacing, transition, and state was considered. The handoff and code quality were equally impressive.",
  },
];

/** Ogee / multifoil jharokha arch — a palace window the headshot reads through.
 *  Drawn in a 200×260 user space; clip + zari rim share the same path. */
const JHAROKHA_PATH =
  "M100 8 C78 8 40 14 22 44 C12 62 8 80 8 100 L8 244 Q8 258 22 258 L178 258 Q192 258 192 244 L192 100 C192 80 188 62 178 44 C160 14 122 8 100 8 Z";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-gold text-gold" : "fill-muted-foreground/20 text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

/** The featured "spotlight" testimonial, framed in a jharokha window. */
function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Reveal className="mb-14 md:mb-16">
      <figure className="glass glass-thick mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[2rem] p-8 text-center md:flex-row md:items-center md:gap-10 md:p-10 md:text-left">
        {/* Jharokha — a view through a palace window */}
        <div
          className="relative mx-auto w-[168px] shrink-0 sm:w-[192px]"
          style={{ aspectRatio: "200 / 260" }}
        >
          <svg
            viewBox="0 0 200 260"
            className="h-full w-full drop-shadow-xl"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <clipPath id="jharokha-arch">
                <path d={JHAROKHA_PATH} />
              </clipPath>
            </defs>
            <image
              href={testimonial.avatar}
              width="200"
              height="260"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#jharokha-arch)"
            />
            {/* Zari rim — gold thread tracing the arch */}
            <path d={JHAROKHA_PATH} fill="none" stroke="var(--gold)" strokeWidth="3" />
            <path d={JHAROKHA_PATH} fill="none" stroke="var(--gold-light)" strokeWidth="1" opacity="0.55" />
          </svg>
        </div>

        <figcaption className="flex flex-1 flex-col items-center md:items-start">
          <span className="eyebrow text-gold">Client Spotlight</span>
          <Quote aria-hidden className="mt-3 h-7 w-7 rotate-180 text-gold/40" fill="currentColor" />
          <blockquote className="mt-2 font-display text-xl leading-snug text-foreground md:text-[1.6rem] md:leading-snug">
            {testimonial.text}
          </blockquote>
          <div className="mt-7 flex w-full flex-col items-center gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <div>
              <div className="font-semibold text-foreground">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role} · {testimonial.company}
              </div>
            </div>
            <StarRating rating={testimonial.rating} />
          </div>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="glass group/card relative w-[340px] shrink-0 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-copper/20 sm:w-[400px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--copper)]/0 to-[var(--peacock)]/0 opacity-0 transition-opacity duration-300 group-hover/card:from-[var(--copper)]/10 group-hover/card:to-[var(--peacock)]/10 group-hover/card:opacity-100"
      />

      <Quote
        aria-hidden
        className="absolute right-6 top-6 h-10 w-10 rotate-180 text-gold/30 transition-colors duration-300 group-hover/card:text-gold/60"
        fill="currentColor"
      />

      <div className="relative">
        <StarRating rating={testimonial.rating} />

        <p className="mt-5 leading-relaxed text-foreground/85">{testimonial.text}</p>

        <div className="mt-7 flex items-center gap-4 border-t border-border pt-5">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className="h-12 w-12 rounded-full border-2 border-gold/50 object-cover"
          />
          <div>
            <div className="font-bold text-foreground">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role} · {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction = "normal",
  duration = "44s",
  label,
}: {
  items: Testimonial[];
  direction?: "normal" | "reverse";
  duration?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "200px" });

  return (
    <div
      ref={ref}
      className="testimonial-marquee group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/60"
      role="group"
      tabIndex={0}
      aria-label={`${label}. Hover or focus to pause the auto-scrolling. Use arrow keys to scroll when motion is reduced.`}
    >
      {/* Edge fade masks — dissolve the marquee into the granite band */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-granite to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-granite to-transparent sm:w-28" />

      <div
        className="testimonial-marquee-track flex w-max gap-6"
        style={
          {
            "--marquee-duration": duration,
            "--marquee-direction": direction,
            animationPlayState: !isInView ? 'paused' : undefined,
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  // Spotlight the first testimonial; the marquee rows use the rest so the
  // featured quote never renders twice.
  const [featured, ...marquee] = testimonials;
  const firstRow = marquee.slice(0, 5);
  const secondRow = marquee.slice(5);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-granite py-20 md:py-32"
    >
      {/* Seam bleeds — soften the sandstone→granite transition into/out of the band.
          Theme-aware (`--background`): sandstone in light mode, granite in dark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
      />
      {/* Warm copper→peacock depth glow over the granite band (replaces indigo night). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--copper)]/8 via-transparent to-[var(--peacock)]/10"
      />

      {/* Always-dark band: force the dark glass tokens so frosted cards stay
          legible regardless of the site's light/dark theme. */}
      <div className="dark relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.6 }}
            className="mb-16 text-center"
          >
            <span className="eyebrow text-accent">Testimonials</span>
            <h2
              id="testimonials-title"
              className="mb-4 mt-3 font-display text-4xl font-bold text-foreground md:text-5xl"
            >
              What Our{" "}
              <span className="text-gradient-brand">
                <TypingText text="Clients Say" delay={150} cursorColor="bg-primary" />
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Don't just take our word for it — hear from the businesses we've helped grow.
            </p>
          </motion.div>

          <FeaturedTestimonial testimonial={featured} />
        </div>

        <div className="flex flex-col gap-6">
          <MarqueeRow items={firstRow} direction="normal" duration="52s" label="Client testimonials, row one" />
          <MarqueeRow items={secondRow} direction="reverse" duration="44s" label="Client testimonials, row two" />
        </div>
      </div>
    </section>
  );
}
