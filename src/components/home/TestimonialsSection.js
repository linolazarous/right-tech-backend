import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Grace M.",
    role: "AI & Data Science Graduate",
    quote:
      "Right Tech Centre completely transformed my career. The AI mentorship program and personalized learning system helped me land a job at a top tech company within months!",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "James O.",
    role: "Software Engineering Student",
    quote:
      "The interactive courses and AI-powered feedback made learning incredibly engaging. I love how each course adapts to your progress.",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Sarah L.",
    role: "Blockchain Certification Student",
    quote:
      "The blockchain-based certification system is genius. My certificate is verifiable and globally recognized — I’m so proud to be a graduate of Right Tech Centre.",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

const TestimonialsSection = () => (
  <section className="relative bg-white dark:bg-gray-950 py-24 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-900/10" />

    <div className="relative max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6"
      >
        What Our Students Say
      </motion.h2>

      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
        Hear from innovators who’ve advanced their careers through our AI-powered learning experience.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map(({ name, role, quote, image }, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-8 text-left"
          >
            <Quote className="w-8 h-8 text-indigo-500 mb-4" />
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">“{quote}”</p>
            <div className="flex items-center gap-4">
              <img
                src={image}
                alt={name}
                className="w-12 h-12 rounded-full object-cover border border-indigo-500/40"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
