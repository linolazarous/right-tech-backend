import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaShield } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext'; // Add this import
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { admin, isAdminAuthenticated, logout: adminLogout } = useAdminAuth(); // Add admin auth

  const navLinks = [
    { path: '/courses', label: 'Courses' },
    { path: '/forum', label: 'Forum' },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About' }
  ];

  // Add admin dashboard link if admin is logged in
  if (isAdminAuthenticated) {
    navLinks.push({ path: '/admin/dashboard', label: 'Admin Dashboard' });
  }

  const handleLogout = () => {
    if (isAdminAuthenticated) {
      adminLogout();
    } else {
      logout();
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold text-indigo-600">
              Right Tech Centre
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAdminAuthenticated ? (
              // Admin is logged in
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm">
                  <FaShield className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">Admin</span>
                  <span className="text-gray-700">{admin?.username || 'Admin'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : isAuthenticated ? (
              // Student is logged in
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
                  <FaUser className="w-4 h-4" />
                  <span>{user?.username || 'User'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              // No one is logged in
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <FaSignInAlt className="w-4 h-4" />
                  <span>Student Login</span>
                </Link>
                <Link 
                  to="/admin/login" 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  <FaShield className="w-4 h-4" />
                  <span>Admin Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                {isAdminAuthenticated ? (
                  // Admin mobile menu
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-green-600">
                      <FaShield className="w-4 h-4" />
                      <span className="font-medium">Admin: {admin?.username || 'Admin'}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-red-600"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : isAuthenticated ? (
                  // Student mobile menu
                  <div className="space-y-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  // No one logged in - mobile menu
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      className="flex items-center space-x-2 px-3 py-2 text-indigo-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaSignInAlt className="w-4 h-4" />
                      <span>Student Login</span>
                    </Link>
                    <Link 
                      to="/admin/login" 
                      className="flex items-center space-x-2 px-3 py-2 text-green-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaShield className="w-4 h-4" />
                      <span>Admin Login</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
