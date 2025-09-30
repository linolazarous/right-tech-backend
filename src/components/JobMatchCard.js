import React from 'react';

const JobMatchCard = ({ title, match, skills }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{title}</h4>
    <div className="text-green-600 font-bold">{match}% match</div>
  </div>
);
export default JobMatchCard;
