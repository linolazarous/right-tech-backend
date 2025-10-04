import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white sm:text-4xl">
          Dynamic Learning Experience
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 🎬 Interactive Videos */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">🎬 Interactive Videos</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Engaging video content with interactive elements to enhance learning.
            </p>
          </div>

          {/* 🎧 Audio Lessons */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">🎧 Audio Lessons</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Learn on-the-go with downloadable audio lessons for every module.
            </p>
          </div>

          {/* 📝 Quizzes & Assessments */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">📝 Quizzes & Assessments</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Reinforce your knowledge with regular quizzes and practical assessments.
            </p>
          </div>

          {/* 💻 Hands-on Projects */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">💻 Hands-on Projects</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Build a portfolio of real-world projects to showcase your skills to employers.
            </p>
          </div>

          {/* 🏢 AI Company Internships */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">🏢 AI Company Internships</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Gain practical experience through optional internships with our tech partners.
            </p>
          </div>

          {/* 🎯 Final Capstone Project */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">🎯 Final Capstone Project</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Conclude your program with a comprehensive capstone project solving a real-world problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
