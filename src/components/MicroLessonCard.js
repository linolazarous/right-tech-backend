import React from 'react';

const MicroLessonCard = ({ title, duration }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{title}</h4>
    <span className="text-sm text-gray-500">{duration} min</span>
  </div>
);
export default MicroLessonCard;
