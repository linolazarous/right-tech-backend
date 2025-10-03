import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your inquiry! We will contact you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        program: ''
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Our admissions team is ready to guide you through enrollment and answer all your questions.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex">
                <i className="fas fa-map-marker-alt text-indigo-600 dark:text-indigo-400 mt-1 fa-2x" aria-hidden="true"></i>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">Our Location</p>
                  <a 
                    href="https://maps.app.goo.gl/9QZ82aV4YVzFwBqA8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    VGFM+98, North Gudele<br />Juba, South Sudan
                  </a>
                </div>
              </div>
              
              <div className="flex">
                <i className="fas fa-phone-alt text-indigo-600 dark:text-indigo-400 mt-1 fa-2x" aria-hidden="true"></i>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">Call Us</p>
                  <a 
                    href="tel:+211925522700" 
                    className="mt-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    +211 925 522 700
                  </a>
                </div>
              </div>
              
              <div className="flex">
                <i className="fas fa-envelope text-indigo-600 dark:text-indigo-400 mt-1 fa-2x" aria-hidden="true"></i>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">Email Us</p>
                  <a 
                    href="mailto:righttechcentre@gmail.com" 
                    className="mt-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    righttechcentre@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0" data-aos="fade-left">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admissions Inquiry Form
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Program of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  >
                    <option value="">-- Select a program --</option>
                    <optgroup label="Certifications">
                      <option value="Certified AI Engineer">Certified AI Engineer</option>
                      <option value="AWS Certified Architect">AWS Certified Architect</option>
                    </optgroup>
                    <optgroup label="Diploma Programs">
                      <option value="Diploma in Web Development">Diploma in Web Development</option>
                      <option value="Diploma in Artificial Intelligence">Diploma in Artificial Intelligence</option>
                      <option value="Diploma in Cybersecurity">Diploma in Cybersecurity</option>
                    </optgroup>
                    <optgroup label="Degree Programs">
                      <option value="Bachelor of Artificial Intelligence">Bachelor of Artificial Intelligence</option>
                      <option value="Bachelor of Computer Science">Bachelor of Computer Science</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2" aria-hidden="true"></i>
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
