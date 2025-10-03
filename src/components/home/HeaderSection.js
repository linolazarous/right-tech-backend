import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full header-gradient z-50">
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
            <span className="ml-3 text-xl font-bold text-white tech-font">Right Tech Centre</span>
          </a>
          
          <nav className="hidden md:block" aria-label="Main navigation">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Home
              </a>
              <a href="#programs" className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Programs
              </a>
              <a href="#courses" className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Courses
              </a>
              <a href="#structure" className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Structure
              </a>
              <a 
                href="#login" 
                className="btn-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:shadow-lg transition duration-300"
                aria-haspopup="dialog" 
                aria-controls="auth-modal"
              >
                <i className="fas fa-sign-in-alt mr-2" aria-hidden="true"></i>
                Login / Sign Up
              </a>
            </div>
          </nav>
          
          <div className="-mr-2 flex md:hidden">
            <button 
              type="button" 
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        id="mobile-menu" 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-900`}
      >
        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3" aria-label="Mobile navigation">
          <a 
            href="#home" 
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#programs" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programs
          </a>
          <a 
            href="#courses" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </a>
          <a 
            href="#structure" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Structure
          </a>
          <a 
            href="#login" 
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            aria-haspopup="dialog" 
            aria-controls="auth-modal"
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
