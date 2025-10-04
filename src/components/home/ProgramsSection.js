import React from 'react';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Learning Paths</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Our Programs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Choose the path that matches your career goals and learning style.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Certification Card */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 h-full border-t-4 border-pink-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-pink-500 rounded-md shadow-lg">
                    
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  📜 Certifications
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                  Industry-recognized credentials in AI, Cybersecurity, and Cloud Computing. Complete in 3–6 months.
                </p>
                <div className="mt-4">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">$300–$1,500</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">or $49–$99/month</span>
                </div>
                <div className="mt-6">
                  <Link 
                    to="/courses?tab=certification" 
                    className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-600 font-medium text-sm"
                  >
                    View 📜 Certifications →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 🎓 Diploma Programs Card */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 h-full border-t-4 border-indigo-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  🎓 Diploma Programs
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                  60 credit hours (15 modules) in Web Dev, AI, or Cybersecurity. Complete in 12–18 months.
                </p>
                <div className="mt-4">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">$2,000–$7,000</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">or $99–$199/month</span>
                </div>
                <div className="mt-6">
                  <Link 
                    to="/courses?tab=diploma" 
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600 font-medium text-sm"
                  >
                    View Diplomas →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 🏛️ Bachelor Degrees Card */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 h-full border-t-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                    
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  🏛️ Bachelor Degrees
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                  120 credit hours (30 modules) in Computer Science or AI. Complete in 24 months.
                </p>
                <div className="mt-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">$10,000–$25,000</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">or $199–$299/month</span>
                </div>
                <div className="mt-6">
                  <Link 
                    to="/courses?tab=degree" 
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 font-medium text-sm"
                  >
                    View Degrees →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
