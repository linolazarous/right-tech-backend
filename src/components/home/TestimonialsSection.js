import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Certified AI Engineer',
      text: 'The AI Engineering program was a game-changer. The hands-on projects helped me land a job at a top tech company.'
    },
    {
      name: 'Maria Garcia',
      role: 'Diploma in Cybersecurity',
      text: 'I enrolled to switch careers. The flexible payment plan made it affordable, and the curriculum was incredibly relevant.'
    },
    {
      name: 'Samuel Chen',
      role: 'Diploma in Web Development',
      text: 'The self-paced structure allowed me to learn while working full-time. The support from instructors was outstanding.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Students Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Thousands of learners have transformed their careers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md">
              <blockquote className="text-gray-600">
                <p className="text-lg">"{testimonial.text}"</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center">
                <div className="ml-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
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
