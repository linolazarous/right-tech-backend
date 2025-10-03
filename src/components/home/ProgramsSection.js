import React from 'react';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  const programs = [
    {
      title: 'Certifications',
      description: 'Industry-recognized credentials in AI, Cybersecurity, and Cloud Computing. Complete in 3–6 months.',
      price: '$300–$1,500',
      monthly: '$49–$99/month',
      icon: 'fas fa-certificate',
      color: 'pink',
      link: '#certification-tab'
    },
    {
      title: 'Diploma Programs', 
      description: '60 credit hours (15 modules) in Web Dev, AI, or Cybersecurity. Complete in 12–18 months.',
      price: '$2,000–$7,000',
      monthly: '$99–$199/month',
      icon: 'fas fa-graduation-cap',
      color: 'indigo',
      link: '#diploma-tab'
    },
    {
      title: 'Bachelor Degrees',
      description: '120 credit hours (30 modules) in Computer Science or AI. Complete in 24 months.',
      price: '$10,000–$25,000',
      monthly: '$199–$299/month',
      icon: 'fas fa-university',
      color: 'purple',
      link: '#degree-tab'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      pink: {
        border: 'border-pink-500',
        bg: 'bg-pink-500',
        text: 'text-pink-600'
      },
      indigo: {
        border: 'border-indigo-500',
        bg: 'bg-indigo-500', 
        text: 'text-indigo-600'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-500',
        text: 'text-purple-600'
      }
    };
    return colors[color] || colors.indigo;
  };

  return (
    <section id="programs" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Learning Paths</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Programs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Choose the path that matches your career goals and learning style.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {programs.map((program, index) => {
            const color = getColorClasses(program.color);
            return (
              <div key={index} className="pt-6">
                <div className={`flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 h-full border-t-4 ${color.border} shadow-md hover:shadow-lg transition-shadow duration-300`}>
                  <div className="-mt-6">
                    <div>
                      <span className={`inline-flex items-center justify-center p-3 ${color.bg} rounded-md shadow-lg`}>
                        <i className={`${program.icon} text-white text-xl`} aria-hidden="true"></i>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {program.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                      {program.description}
                    </p>
                    <div className="mt-4">
                      <span className={`font-bold ${color.text}`}>
                        {program.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        or {program.monthly}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Link 
                        to={program.link}
                        className={`font-medium text-sm ${color.text} hover:opacity-80 transition-colors`}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
