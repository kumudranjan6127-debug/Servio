import { motion } from 'motion/react';
import { FileText, Globe, Briefcase, ShoppingCart, Code, Settings } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Landing Pages',
    description: 'High-converting landing pages designed to capture leads and drive conversions.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Business Websites',
    description: 'Professional multi-page websites that establish your online presence.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Websites',
    description: 'Showcase your work with stunning portfolio designs that impress clients.',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Stores',
    description: 'Full-featured online stores with secure payment processing and inventory management.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Code,
    title: 'Custom Web Applications',
    description: 'Tailored web applications built to solve your unique business challenges.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Settings,
    title: 'Website Maintenance',
    description: 'Ongoing support and updates to keep your website running smoothly.',
    color: 'from-violet-500 to-purple-500',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Succeed Online
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From landing pages to complex web applications, we deliver solutions that drive results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm">Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
