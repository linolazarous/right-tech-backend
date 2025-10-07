import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Globe, Brain, Database, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: <Cpu />,
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Master AI fundamentals, neural networks, and deep learning. Includes hands-on projects with Python, TensorFlow, and OpenAI integration.",
  },
  {
    icon: <Code />,
    title: "Software Engineering",
    description:
      "Build scalable web and mobile applications with JavaScript, React, Node.js, and Flutter — following modern DevOps practices.",
  },
  {
    icon: <Database />,
    title: "Data Science & Analytics",
    description:
      "Learn data visualization, predictive analytics, and big data technologies to turn information into actionable insights.",
  },
  {
    icon: <Globe />,
    title: "Web Development & Cloud Computing",
    description:
      "Design and deploy full-stack cloud applications using AWS, Docker, and modern frameworks.",
  },
  {
    icon: <Shield />,
    title: "Cybersecurity & Ethical Hacking",
    description:
      "Protect digital systems from threats through advanced ethical hacking, encryption, and network defense techniques.",
  },
  {
    icon: <Brain />,
    title: "Blockchain & FinTech Innovation",
    description:
      "Explore blockchain architecture, smart contracts, and decentralized applications with real-world FinTech case studies.",
  },
];

const ProgramsSection = () => (
  <section id="programs" className="bg-gray-50 dark:bg-gray-900 py-24 px-6">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6"
      >
        Our Academic Programs
      </motion.h2>

      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
        Advance your career with our AI-powered, industry-aligned diploma and degree programs.  
        Learn from experts, collaborate globally, and earn blockchain-certified credentials.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {programs.map(({ icon, title, description }, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-sm text-left hover:shadow-lg transition-all duration-300"
          >
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 w-fit rounded-xl text-indigo-600 mb-4">
              {React.cloneElement(icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            <Link
              to="/programs"
              className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsSection;
