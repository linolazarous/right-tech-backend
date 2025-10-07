import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🎬",
    title: "Interactive Videos",
    text: "Engaging visual content to deepen understanding and retention.",
  },
  {
    icon: "🎧",
    title: "Audio Lessons",
    text: "Learn anywhere with downloadable audio lessons per module.",
  },
  {
    icon: "📝",
    title: "AI-Generated Quizzes",
    text: "Adaptive assessments to test your comprehension intelligently.",
  },
  {
    icon: "💻",
    title: "Hands-on Projects",
    text: "Build real-world projects to showcase your portfolio.",
  },
  {
    icon: "🏢",
    title: "Internships with AI Companies",
    text: "Gain practical industry experience through verified internships.",
  },
  {
    icon: "🎯",
    title: "Capstone Project",
    text: "End your journey with a project solving real-world tech challenges.",
  },
];

const FeaturesSection = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Dynamic Learning Experience
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="ml-3 font-semibold text-lg text-gray-900 dark:text-white">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
