import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Simple sections for now - we can add your actual components later
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Right Tech Centre
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Affordable Tech Certifications, Diplomas & Degrees
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Courses
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const ProgramsSection = () => {
  const programs = [
    {
      title: 'Certifications',
      description: 'Industry-recognized certifications to boost your career',
      icon: '📜'
    },
    {
      title: 'Diplomas', 
      description: 'Comprehensive diploma programs for in-depth learning',
      icon: '🎓'
    },
    {
      title: 'Degrees',
      description: 'Advanced degree programs for professional growth',
      icon: '⭐'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Programs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    console.log('HomePage loaded - User:', user);
    
    // Simple animation instead of AOS for now
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fade-in opacity-0 transform translate-y-4 transition-all duration-500">
        <HeroSection />
      </div>
      <div className="fade-in opacity-0 transform translate-y-4 transition-all duration-500 delay-200">
        <ProgramsSection />
      </div>
    </div>
  );
};

export default HomePage;
