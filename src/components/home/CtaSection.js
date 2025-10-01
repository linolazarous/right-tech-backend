import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to transform your future?
            </h2>
            <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
              Join thousands of students who've accelerated their careers with our industry-leading programs.
            </p>
          </div>

          {/* Right Content - CTA Buttons */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-white bg-opacity-10 rounded-xl p-8 border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white">Start your journey</h3>
              <div className="mt-6 grid grid-cols-1 gap-4">
                <Link 
                  to="/courses" 
                  className="flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-indigo-900 bg-white hover:bg-indigo-50 transition-colors"
                >
                  Explore Programs
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
