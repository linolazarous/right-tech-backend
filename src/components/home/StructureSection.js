import React from 'react';

const StructureSection = () => {
  const features = [
    {
      title: "Modular 4-Credit System",
      description: "Focused learning in 4-credit modules that build comprehensive skills through sequential mastery."
    },
    {
      title: "Flexible Pace",
      description: "Complete at your own speed: 12-18 months for diplomas or 24 months for degrees/certifications."
    },
    {
      title: "Practical Assessments",
      description: "Hands-on projects, coding challenges, and real-world simulations that test applied knowledge."
    },
    {
      title: "Industry Capstone",
      description: "Final project solving real business challenges, often in collaboration with tech partners."
    }
  ];

  return (
    <section id="structure" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center" data-aos="fade-up">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            Innovative Learning Model
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Future-Ready Program Structure
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
            Designed for flexibility and real-world application
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
