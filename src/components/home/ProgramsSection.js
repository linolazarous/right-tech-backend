import React from 'react';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  const programs = [
    {
      title: 'Certifications',
      description: 'Industry-recognized credentials in AI, Cybersecurity, and Cloud Computing.',
      price: '$300–$1,500',
      color: 'pink'
    },
    {
      title: 'Diploma Programs', 
      description: '60 credit hours in Web Dev, AI, or Cybersecurity. Complete in 12–18 months.',
      price: '$2,000–$7,000',
      color: 'indigo'
    },
    {
      title: 'Bachelor Degrees',
      description: '120 credit hours in Computer Science or AI. Complete in 24 months.',
      price: '$10,000–$25,000',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      pink: 'border-pink-500 bg-pink-500 text-pink-600',
      indigo: 'border-indigo-500 bg-indigo-500 text-indigo-600', 
      purple: 'border-purple-500 bg-purple-500 text-purple-600'
    };
    return colors[color] || colors.indigo;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Learning Paths</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Programs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the path that matches your career goals and learning style.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <div key={index} className="pt-6">
              <div className={`flow-root bg-white rounded-lg px-6 pb-8 h-full border-t-4 ${getColorClasses(program.color).split(' ')[0]} shadow-md hover:shadow-lg transition-shadow`}>
                <div className="-mt-6">
                  <div>
                    <span className={`inline-flex items-center justify-center p-3 ${getColorClasses(program.color).split(' ')[1]} rounded-md shadow-lg text-white`}>
                      {program.icon || '📚'}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {program.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {program.description}
                  </p>
                  <div className="mt-4">
                    <span className={`font-bold ${getColorClasses(program.color).split(' ')[2]}`}>
                      {program.price}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Link 
                      to="/courses" 
                      className={`font-medium text-sm ${getColorClasses(program.color).split(' ')[2]} hover:opacity-80`}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
