import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SmoothLink } from "./SmoothLink";
import { MandalaRing } from "./motifs";

const faqs = [
  {
    q: "How long does a website take to build?",
    a: "Timelines depend on complexity. A landing page typically takes 3–7 days, a business website 1–2 weeks, and a custom web application 4–8 weeks. We'll give you a precise timeline after reviewing your requirements.",
  },
  {
    q: "How much does a website cost?",
    a: "Our projects start at ₹7,999 for a landing page. Business websites typically range from ₹65,000–₹1,20,000, and custom applications from ₹1,60,000 upward. Every project is unique, so we provide a free detailed quote after understanding your needs.",
  },
  {
    q: "Do you provide hosting and domain services?",
    a: "We don't sell hosting directly, but we can recommend the best platforms for your project (Vercel, Netlify, AWS, etc.) and handle the full deployment process. We'll guide you through purchasing and setting up your domain.",
  },
  {
    q: "Can I request revisions during development?",
    a: "Absolutely. All plans include revisions — Starter includes 2, Business includes 5, and Premium includes unlimited revisions. We work collaboratively through each milestone to ensure you're completely satisfied.",
  },
  {
    q: "Do you work with businesses outside your country?",
    a: "Yes! We work with clients globally. All communication happens via video calls, email, and project management tools. We accommodate different time zones to ensure smooth collaboration.",
  },
  {
    q: "What happens after my website launches?",
    a: "We don't disappear after launch. We provide a post-launch support period (30 days on Starter, 60 days on Business, 90 days on Premium) to fix any bugs and ensure everything runs smoothly. Ongoing maintenance plans are also available.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="faq-title" className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3">
            <MandalaRing size={40} className="opacity-80" />
            <span className="eyebrow text-primary">FAQ</span>
          </div>
          <h2
            id="faq-title"
            className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4"
          >
            Frequently Asked{" "}
            <span className="text-gradient-brand">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : index * 0.05 }}
                style={
                  isOpen
                    ? ({ "--glass-tint": "var(--saffron)" } as React.CSSProperties)
                    : undefined
                }
                className={`glass overflow-hidden rounded-2xl transition-all duration-200 ${
                  isOpen ? "shadow-elev-2 ring-1 ring-primary/30" : "hover:shadow-elev-1"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-semibold transition-colors ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 ml-4 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.3 }}
          className="glass mt-10 rounded-2xl p-6 text-center"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <SmoothLink
              to="contact"
              className="text-primary font-semibold hover:underline"
            >
              Get in touch with us
            </SmoothLink>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
