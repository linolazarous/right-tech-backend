import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0.95]);
  const headerHeight = useTransform(scrollY, [0, 150], ["5rem", "4rem"]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#programs", label: "Programs" },
    { href: "#courses", label: "Courses" },
    { href: "#structure", label: "Structure" },
  ];

  return (
    <motion.header
      style={{ opacity: headerOpacity, height: headerHeight }}
      className="fixed w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 shadow-lg z-50 backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center"
            aria-label="Right Tech Centre Home"
          >
            <img
              src="/images/logo.webp"
              alt="Right Tech Centre Logo"
              className="h-10 w-auto"
              width="40"
              height="40"
              loading="eager"
            />
            <span className="ml-3 text-lg sm:text-xl font-bold text-white tracking-wide">
              Right Tech Centre
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#login"
              className="login-trigger bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center"
            >
              <span className="mr-2">🔐</span> Login / Sign Up
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-md transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-indigo-950/95 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#login"
            className="block text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-3 py-3 rounded-md text-center transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mr-2">🔐</span> Login / Sign Up
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default React.memo(Header);
