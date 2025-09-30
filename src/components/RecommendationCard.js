import React from 'react';

const RecommendationCard = ({ title, type }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{title}</h4>
    <span className="text-sm text-blue-600">{type}</span>
  </div>
);
export default RecommendationCard;
