import React from "react";

const AboutSection = () => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center lg:text-left">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        About <span className="text-indigo-600">Right Tech Centre</span>
      </h2>

      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Right Tech Centre is a world-class, AI-powered eLearning institution
        offering global access to high-quality technology education. Our mission
        is to empower innovators and creators with future-ready digital skills.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Our Vision
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            To bridge the global tech education divide by making world-class
            learning accessible, affordable, and adaptive — powered by AI.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We inspire learners to innovate, excel, and collaborate — nurturing
            minds that will shape the digital future.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
