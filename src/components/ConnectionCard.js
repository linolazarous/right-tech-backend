import React from 'react';

const ConnectionCard = ({ name, role }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{name}</h4>
    <span className="text-sm text-gray-600">{role}</span>
  </div>
);
export default ConnectionCard;
