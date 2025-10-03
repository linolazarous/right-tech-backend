import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-gradient-to-r from-indigo-900 to-purple-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <a href="#home" className="flex-shrink-0 flex items-center" aria-label="Right Tech Centre Home">
            <img 
              className="h-10 w-auto" 
              src="/images/logo.webp" 
              alt="Right Tech Centre Logo" 
              width="40" 
              height="40" 
              loading="eager" 
            />
            <span className="ml-3 text-xl font-bold text-white">Right Tech Centre</span>
          </a>
          
          <nav className="hidden md:block" aria-label="Main navigation">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#programs" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Programs
              </a>
              <a href="#courses" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors courses-trigger">
                Courses
              </a>
              <a href="#structure" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Structure
              </a>
              <a 
                href="#login" 
                className="login-trigger bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                <i className="fas fa-sign-in-alt mr-2" aria-hidden="true"></i>
                Login / Sign Up
              </a>
            </div>
          </nav>
          
          <div className="-mr-2 flex md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-800 focus:outline-none transition-colors"
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-indigo-900 transition-all duration-300`}
      >
        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#home" 
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#programs" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-indigo-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programs
          </a>
          <a 
            href="#courses" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-indigo-800 transition-colors courses-trigger"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </a>
          <a 
            href="#structure" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-indigo-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Structure
          </a>
          <a 
            href="#login" 
            className="login-trigger block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login / Sign Up
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
