#!/bin/bash

echo "🛠️ Fixing missing files..."

# Create missing components with basic implementations
mkdir -p src/components/ui

# 1. Create missing UI components
cat > src/components/ui/LoadingSpinner.js << 'LOADING'
import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}></div>
  );
};

export default LoadingSpinner;
LOADING

# 2. Create missing card components
cat > src/components/CareerPathCard.js << 'CAREER'
import React from 'react';

const CareerPathCard = ({ title, description, skills, duration }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{duration}</span>
      <span>{skills?.length || 0} skills</span>
    </div>
  </div>
);

export default CareerPathCard;
CAREER

cat > src/components/JobCard.js << 'JOB'
import React from 'react';

const JobCard = ({ title, company, location, salary, type }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">{company} • {location}</p>
    <div className="flex justify-between mt-4 text-sm">
      <span className="text-green-600">{salary}</span>
      <span className="text-blue-600">{type}</span>
    </div>
  </div>
);

export default JobCard;
JOB

# 3. Create other essential missing components
cat > src/components/CommentSection.js << 'COMMENT'
import React from 'react';

const CommentSection = () => (
  <div className="mt-4">
    <h4 className="font-semibold mb-2">Comments</h4>
    <p className="text-gray-500">Comment section coming soon...</p>
  </div>
);

export default CommentSection;
COMMENT

cat > src/components/InterviewQuestion.js << 'INTERVIEW'
import React from 'react';

const InterviewQuestion = ({ question, answer }) => (
  <div className="bg-white rounded-lg p-4 shadow border mb-4">
    <h4 className="font-semibold mb-2">{question}</h4>
    <p className="text-gray-700">{answer}</p>
  </div>
);

export default InterviewQuestion;
INTERVIEW

# 4. Create missing JSON translation files
mkdir -p src/i18n/locales/{en,zh,hi,es,fr,ar,bn,pt,ru,ur}

for lang in en zh hi es fr ar bn pt ru ur; do
  cat > src/i18n/locales/$lang/translation.json << JSON
{
  "welcome": "Welcome",
  "home": "Home",
  "courses": "Courses", 
  "about": "About",
  "contact": "Contact"
}
JSON
done

# 5. Create missing utility files
cat > src/utils/constants.js << 'CONSTANTS'
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.righttechcentre.com';
export const APP_NAME = 'Right Tech Centre';
export const SUPPORT_EMAIL = 'support@righttechcentre.com';

// Course constants
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced'
};

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
};
CONSTANTS

cat > src/utils/monitoring.js << 'MONITORING'
// Monitoring utilities
export const logError = (error, context = {}) => {
  console.error('Error:', error, 'Context:', context);
};

export const logEvent = (event, data = {}) => {
  console.log('Event:', event, 'Data:', data);
};

export const initMonitoring = () => {
  console.log('Monitoring initialized');
};
MONITORING

echo "✅ Missing files created!"
