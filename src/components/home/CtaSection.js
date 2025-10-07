import React from "react";
import { Link } from "react-router-dom";

const CtaSection = () => (
  <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 py-20 text-white text-center">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-4xl font-bold">
        Ready to Transform Your Future?
      </h2>
      <p className="mt-4 text-lg text-indigo-100">
        Join thousands of learners advancing their tech careers through AI-powered education.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/courses"
          className="px-8 py-4 bg-white text-indigo-900 font-medium rounded-lg hover:bg-indigo-50 transition-all"
        >
          🔍 Explore Programs
        </Link>
        <Link
          to="/register"
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
        >
          🎓 Apply Now
        </Link>
      </div>
    </div>
  </section>
);

export default CtaSection;
