import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Interactive Videos',
      description: 'Engaging video content with interactive elements to enhance learning.',
      icon: '🎬',
      color: 'indigo'
    },
    {
      title: 'Audio Lessons',
      description: 'Learn on-the-go with downloadable audio lessons for every module.',
      icon: '🎧',
      color: 'purple'
    },
    {
      title: 'Quizzes & Assessments',
      description: 'Reinforce your knowledge with regular quizzes and practical assessments.',
      icon: '📝',
      color: 'pink'
    },
    {
      title: 'Hands-on Projects',
      description: 'Build a portfolio of real-world projects to showcase your skills to employers.',
      icon: '💻',
      color: 'teal'
    },
    {
      title: 'AI Company Internships',
      description: 'Gain practical experience through optional internships with our tech partners.',
      icon: '🏢',
      color: 'blue'
    },
    {
      title: 'Final Capstone Project',
      description: 'Conclude your program with a comprehensive project solving a real-world problem.',
      icon: '🎯',
      color: 'yellow'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      indigo: 'bg-indigo-100 dark:bg-indigo-900',
      purple: 'bg-purple-100 dark:bg-purple-900',
      pink: 'bg-pink-100 dark:bg-pink-900',
      teal: 'bg-teal-100 dark:bg-teal-900',
      blue: 'bg-blue-100 dark:bg-blue-900',
      yellow: 'bg-yellow-100 dark:bg-yellow-900'
    };
    return colors[color] || colors.indigo;
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white sm:text-4xl">
          Dynamic Learning Experience
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${getColorClasses(feature.color)}`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
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
