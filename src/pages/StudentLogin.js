import React from 'react';
import { Link } from 'react-router-dom';

function StudentLogin() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Student login functionality coming soon
          </p>
        </div>
        <div className="text-center">
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
