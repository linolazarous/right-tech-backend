import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative text-white pt-28 pb-24 overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800"
    >
      <div className="absolute inset-0 bg-[url('/images/hero-bg-pattern.svg')] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10 grid lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Future-Ready{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
              Tech Education
            </span>
          </h1>

          <p className="mt-5 text-lg text-indigo-100 leading-relaxed">
            Master in-demand skills in AI, Web3, Cloud, and Cybersecurity.
            Earn Diplomas, Degrees, and Certifications through our 4-credit,
            project-based system.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["🤖 AI & ML", "⛓️ Blockchain", "🛡️ Cybersecurity", "☁️ Cloud"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm"
                >
                  {item}
                </span>
              )
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="px-6 py-3 text-indigo-900 bg-white font-medium rounded-lg hover:bg-indigo-50 shadow-md transition-transform transform hover:-translate-y-1"
            >
              💻 Explore Courses
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition-transform transform hover:-translate-y-1"
            >
              🚀 Get Started
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Floating Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <img
            src="/images/hero-illustration.svg"
            alt="Right Tech Centre Learning"
            className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
