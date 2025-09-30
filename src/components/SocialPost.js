import React from 'react';

const SocialPost = ({ content, author }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <p>{content}</p>
    <div className="text-sm text-gray-500 mt-2">- {author}</div>
  </div>
);
export default SocialPost;
