import React from 'react';

const StudyGroupCard = ({ name, members, topic }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h4 className="font-semibold">{name}</h4>
    <p className="text-sm text-gray-600">{topic}</p>
    <span className="text-sm text-gray-500">{members} members</span>
  </div>
);
export default StudyGroupCard;
