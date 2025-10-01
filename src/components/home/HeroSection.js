import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Future-Ready</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                Tech Education
              </span>
            </h1>
            
            <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Master in-demand skills with our self-paced programs in AI, Web3, Cybersecurity, and more. 
              Earn diplomas, degrees, or industry certifications.
            </p>
            
            {/* Tech Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['AI & ML', 'Blockchain', 'Cybersecurity', 'Cloud Computing'].map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-800 bg-opacity-60 text-indigo-100"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses" 
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-gray-50 transition-colors"
              >
                Explore Courses
              </Link>
              <Link 
                to="/login" 
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Right Content - Placeholder */}
          <div className="mt-12 lg:mt-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-xl overflow-hidden bg-indigo-800 bg-opacity-50 p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-blue-100">Start your tech journey today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
