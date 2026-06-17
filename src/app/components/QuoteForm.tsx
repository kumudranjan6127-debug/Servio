import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

const budgetOptions = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

const websiteTypes = [
  "Landing Page",
  "Business Website",
  "Portfolio Website",
  "E-Commerce Store",
  "Custom Web Application",
  "Website Redesign",
];

type FormData = {
  name: string;
  email: string;
  business: string;
  budget: string;
  type: string;
  description: string;
};

export function QuoteForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    business: "",
    budget: "",
    type: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.business.trim()) errs.business = "Business name is required";
    if (!form.budget) errs.budget = "Please select a budget";
    if (!form.type) errs.type = "Please select a website type";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ${
      errors[field] ? "border-red-400/60" : "border-white/20 hover:border-white/30"
    }`;

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-[#0f0f1a] via-[#1a0a2e] to-[#0f0f1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Request Your{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              Free Proposal
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Tell us about your project and we'll send you a detailed proposal within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/40"
        >
          {submitted ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Proposal Sent!</h3>
              <p className="text-gray-400">
                Thank you, {form.name}! We've received your request and will reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sarah Chen"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>}
                </div>

                {/* Business */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className={inputClass("business")}
                  />
                  {errors.business && <p className="mt-1.5 text-red-400 text-xs">{errors.business}</p>}
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range <span className="text-indigo-400">*</span>
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={`${inputClass("budget")} appearance-none bg-[#1a1040]`}
                  >
                    <option value="" disabled>Select budget</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b} className="bg-[#1a1040]">{b}</option>
                    ))}
                  </select>
                  {errors.budget && <p className="mt-1.5 text-red-400 text-xs">{errors.budget}</p>}
                </div>

                {/* Website Type */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website Type <span className="text-indigo-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {websiteTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          form.type === type
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/5 border-white/15 text-gray-300 hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.type && <p className="mt-1.5 text-red-400 text-xs">{errors.type}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Proposal...
                    </>
                  ) : (
                    <>
                      Get My Free Proposal
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
