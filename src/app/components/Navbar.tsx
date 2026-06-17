import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Servio
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 font-medium"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 font-medium"
              >
                Get Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
