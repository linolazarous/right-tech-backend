import React from 'react';

const ScholarshipCard = ({ title, amount, deadline }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{title}</h4>
    <div className="text-green-600 font-bold">{amount}</div>
    <span className="text-sm text-gray-500">Deadline: {deadline}</span>
  </div>
);
export default ScholarshipCard;
