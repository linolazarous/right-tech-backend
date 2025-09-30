import React from 'react';

const CourseProgressCard = ({ title, progress }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{title}</h4>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${progress}%`}}></div>
    </div>
    <span className="text-sm text-gray-600">{progress}% complete</span>
  </div>
);
export default CourseProgressCard;
