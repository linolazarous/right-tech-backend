import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Certified AI Engineer',
      text: 'The AI Engineering program was a game-changer. The hands-on projects and mentorship helped me land a job at a top tech company before I even graduated.',
      image: '/images/student-1.webp'
    },
    {
      name: 'Maria Garcia',
      role: 'Diploma in Cybersecurity',
      text: 'I enrolled in the Cybersecurity diploma to switch careers. The flexible payment plan made it affordable, and the curriculum was incredibly relevant to the industry\'s needs.',
      image: '/images/student-2.webp'
    },
    {
      name: 'Samuel Chen',
      role: 'Diploma in Web Development',
      text: 'The self-paced structure of the Web Development diploma allowed me to learn while working full-time. The support from instructors was outstanding.',
      image: '/images/student-3.webp'
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Students Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Thousands of learners have transformed their careers. Here's what they say.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <blockquote className="text-gray-600 dark:text-gray-200">
                <i className="fas fa-quote-left text-indigo-200 dark:text-indigo-400 text-3xl" aria-hidden="true"></i>
                <p className="mt-4 text-lg">"{testimonial.text}"</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">{testimonial.role}</div>
                </div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
