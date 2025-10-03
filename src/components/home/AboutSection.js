import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About Right Tech Centre
          </h2>
          <div className="mt-6 text-lg text-gray-600 dark:text-gray-300 space-y-4 text-left">
            <p>
              Welcome to Right Tech Centre, your premier online destination for high-quality tech courses. 
              We are committed to providing top-notch educational resources to tech enthusiasts globally.
            </p>
            <p>
              Our focus is on offering a diverse range of courses in technology, creativity, and critical thinking, 
              catering to individuals with medium-income levels.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">Our Mission</h3>
            <p>
              Right Tech Centre was founded with the vision of bridging the gap between technology education 
              and accessibility. Our online platform allows us to reach a wider audience and provide flexible 
              learning options.
            </p>
            <p>
              We understand the importance of continuous learning in today's fast-paced tech industry, 
              and we are here to support our students on their educational journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
