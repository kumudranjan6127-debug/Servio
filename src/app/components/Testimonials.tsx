import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

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
    name: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Servio transformed our online presence completely. Our new website loads in under 2 seconds and our conversion rate jumped by 47% within the first month. The team was incredibly professional and delivered ahead of schedule.",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    role: "Founder",
    company: "Bloom Digital",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Working with Servio was seamless from start to finish. They took our rough ideas and turned them into a stunning e-commerce store that our customers love. Revenue increased 3x in just 60 days after launch.",
  },
  {
    id: 3,
    name: "Priya Mehta",
    role: "Creative Director",
    company: "Artisan Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "The portfolio website Servio built for us is breathtaking. Every client who visits comments on how impressive and polished it looks. The attention to micro-interactions and detail is unmatched.",
  },
  {
    id: 4,
    name: "James Rivera",
    role: "COO",
    company: "CloudSync Labs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "We needed a complex SaaS dashboard built quickly. Servio delivered in 3 weeks with clean code, excellent documentation, and ongoing support that's been invaluable. Highly recommend.",
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "Marketing Lead",
    company: "Nova Retail",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Our campaign landing pages have never converted better. Servio's design sense paired with rock-solid performance gave us an instant lift in qualified leads. Truly a partner, not just a vendor.",
  },
  {
    id: 6,
    name: "David Okafor",
    role: "CTO",
    company: "Finch Analytics",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Clean architecture, thoughtful APIs, and a UI our customers genuinely enjoy using. Servio understood our product deeply and shipped exactly what we needed, on time and on budget.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group/card relative w-[340px] sm:w-[400px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-indigo-500/20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover/card:from-indigo-500/10 group-hover/card:to-cyan-500/10 group-hover/card:opacity-100"
      />

      <Quote
        aria-hidden
        className="absolute right-6 top-6 h-10 w-10 rotate-180 text-indigo-400/30 transition-colors duration-300 group-hover/card:text-indigo-400/60"
        fill="currentColor"
      />

      <div className="relative">
        <StarRating rating={testimonial.rating} />

        <p className="mt-5 text-white/85 leading-relaxed">{testimonial.text}</p>

        <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className="h-12 w-12 rounded-full border-2 border-indigo-400/50 object-cover"
          />
          <div>
            <div className="font-bold text-white">{testimonial.name}</div>
            <div className="text-sm text-gray-400">
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
}: {
  items: Testimonial[];
  direction?: "normal" | "reverse";
  duration?: string;
}) {
  return (
    <div className="testimonial-marquee group relative overflow-hidden">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0f0f1a] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#1a1040] to-transparent sm:w-28" />

      <div
        className="testimonial-marquee-track flex w-max gap-6"
        style={
          {
            "--marquee-duration": duration,
            "--marquee-direction": direction,
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
  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="overflow-hidden bg-gradient-to-br from-[#0f0f1a] to-[#1a1040] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Testimonials
          </span>
          <h2 id="testimonials-title" className="mb-4 mt-3 text-4xl font-bold text-white md:text-5xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow items={firstRow} direction="normal" duration="44s" />
        <MarqueeRow items={secondRow} direction="reverse" duration="52s" />
      </div>
    </section>
  );
}
