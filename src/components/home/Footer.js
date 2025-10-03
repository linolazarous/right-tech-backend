import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="ml-2 text-xl font-bold">Right Tech Centre</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Future-ready tech education for career advancement.
            </p>
            
            <div className="mt-6 flex space-x-4 md:hidden">
              <a href="https://www.facebook.com/share/1P2ydiamxx/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <span className="text-lg">📘</span>
              </a>
              <a href="https://x.com/righttechcentre?s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <span className="text-lg">🐦</span>
              </a>
              <a href="https://www.linkedin.com/in/right-tech-centre-368213369" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <span className="text-lg">💼</span>
              </a>
              <a href="https://www.youtube.com/@RightTechCentre" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <span className="text-lg">📺</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Programs</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#certification-tab" className="text-gray-400 hover:text-white text-sm transition-colors">Certifications</a></li>
              <li><a href="#diploma-tab" className="text-gray-400 hover:text-white text-sm transition-colors">Diplomas</a></li>
              <li><a href="#degree-tab" className="text-gray-400 hover:text-white text-sm transition-colors">Degrees</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white text-sm transition-colors courses-trigger">All Courses</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Admissions</a></li>
              <li><a href="#login" className="text-gray-400 hover:text-white text-sm transition-colors login-trigger">Student Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-500 transition-all duration-300">
            <div className="flex items-start">
              <div className="bg-pink-600 p-3 rounded-lg">
                <span className="text-white text-lg">💰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold">Earn 30% Commissions</h3>
                <p className="mt-1 text-gray-300 text-sm">
                  Join our affiliate program and earn for every referred student.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Per Certification</p>
                    <p className="font-bold text-pink-400">$150–$450</p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Per Degree</p>
                    <p className="font-bold text-pink-400">$1,800+</p>
                  </div>
                </div>
                <a 
                  href="/affiliate" 
                  className="mt-4 inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Become an Affiliate →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                © {currentYear} Right Tech Centre. All rights reserved.
                <a href="#" className="hover:text-white ml-4 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white ml-4 transition-colors">Terms of Service</a>
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex justify-center space-x-6">
              <a href="https://www.facebook.com/share/1P2ydiamxx/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <span className="text-lg">📘</span>
              </a>
              <a href="https://x.com/righttechcentre?s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <span className="text-lg">🐦</span>
              </a>
              <a href="https://www.linkedin.com/in/right-tech-centre-368213369" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <span className="text-lg">💼</span>
              </a>
              <a href="https://www.youtube.com/@RightTechCentre" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <span className="text-lg">📺</span>
              </a>
              <a href="https://www.instagram.com/righttechcentre?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <span className="text-lg">📷</span>
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="text-3xl opacity-80 hover:opacity-100 transition-opacity" aria-label="Visa">💳</span>
            <span className="text-3xl opacity-80 hover:opacity-100 transition-opacity" aria-label="Mastercard">💳</span>
            <span className="text-3xl opacity-80 hover:opacity-100 transition-opacity" aria-label="PayPal">💳</span>
            <span className="text-3xl opacity-80 hover:opacity-100 transition-opacity" aria-label="Secure Payments">🛡️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
