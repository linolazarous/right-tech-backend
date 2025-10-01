import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Interactive Videos',
      description: 'Engaging video content with interactive elements to enhance learning.',
      icon: '🎬'
    },
    {
      title: 'Audio Lessons',
      description: 'Learn on-the-go with downloadable audio lessons for every module.',
      icon: '🎧'
    },
    {
      title: 'Quizzes & Assessments',
      description: 'Reinforce your knowledge with regular quizzes and practical assessments.',
      icon: '📝'
    },
    {
      title: 'Hands-on Projects',
      description: 'Build a portfolio of real-world projects to showcase your skills.',
      icon: '💻'
    },
    {
      title: 'Industry Internships',
      description: 'Gain practical experience through optional internships with tech partners.',
      icon: '🏢'
    },
    {
      title: 'Capstone Project',
      description: 'Conclude with a comprehensive project solving real-world problems.',
      icon: '🎯'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          Dynamic Learning Experience
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg text-2xl">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
