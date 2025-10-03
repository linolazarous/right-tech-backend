import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="home" className="relative text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Earn diplomas, degrees, or industry certifications with flexible 4-credit modules.
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
            
            {/* Pricing Info */}
            <div className="mt-6 bg-indigo-900 bg-opacity-50 rounded-lg p-3 inline-flex items-center border border-indigo-700 hover:shadow-lg transition-all">
              <span className="text-white text-sm font-medium">
                Start for <span className="font-bold">$29/month</span> with flexible payments. 
                <a href="#pricing" className="underline ml-1">See plans</a>
              </span>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses" 
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <i className="fas fa-laptop-code mr-2" aria-hidden="true"></i> 
                Explore Courses
              </Link>
              <Link 
                to="/login" 
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 md:py-4 md:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <i className="fas fa-rocket mr-2" aria-hidden="true"></i> 
                Get Started
              </Link>
            </div>
            
            {/* Student Testimonials */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-indigo-300"></div>
                ))}
              </div>
              <div className="text-sm text-blue-100">
                <p>Join 5,000+ students advancing their careers</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="ml-2">4.9/5 (1,200+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content */}
          <div className="mt-12 lg:mt-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-xl shadow-2xl lg:max-w-md overflow-hidden border-4 border-white border-opacity-20 transform hover:scale-105 transition duration-500">
              <div className="bg-indigo-800 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-blue-100">Interactive Learning Platform</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                NEW: AI Courses
              </div>
              <div className="absolute bottom-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                Trending Now
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trusted Partners */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 py-3 overflow-hidden z-10">
        <div className="flex items-center space-x-12 animate-marquee">
          <span className="text-sm text-white opacity-70 whitespace-nowrap">TRUSTED BY TECH LEADERS:</span>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="h-8 w-20 bg-gray-600 opacity-70 rounded"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
