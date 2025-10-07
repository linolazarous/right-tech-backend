import React from "react";
import { motion } from "framer-motion";

const StructureSection = () => {
  const features = [
    {
      title: "Modular 4-Credit System",
      description:
        "Focused learning in modular 4-credit units that progressively build real-world expertise.",
    },
    {
      title: "Flexible Learning Pace",
      description:
        "Study at your own speed — 12-18 months for diplomas or up to 24 months for degree certifications.",
    },
    {
      title: "Practical Assessments",
      description:
        "Hands-on projects, coding challenges, and simulations ensure applied understanding of key concepts.",
    },
    {
      title: "Industry Capstone Projects",
      description:
        "Solve real business challenges with capstone projects, guided by expert mentors and industry partners.",
    },
  ];

  return (
    <section id="structure" className="bg-white dark:bg-gray-950 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          Future-Ready Program Structure
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
          Designed for flexibility, innovation, and hands-on learning — enabling
          students to thrive in tomorrow’s tech-driven world.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(StructureSection);
