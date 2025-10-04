import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getReportedContent, moderateContent } from '../services/moderationService';

const Moderation = ({ moderatorId }) => {
  const [reportedItems, setReportedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchReportedContent = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getReportedContent(moderatorId, activeTab);
        setReportedItems(data);
      } catch (err) {
        console.error('Moderation error:', err);
        setError('Failed to load reported content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportedContent();
  }, [moderatorId, activeTab]);

  const handleModeration = async (itemId, action) => {
    try {
      await moderateContent(moderatorId, itemId, action);
      setReportedItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Moderation action failed:', err);
      setError(`Failed to ${action} content`);
    }
  };

  return (
    <div className="moderation-dashboard p-6 bg-white rounded-lg shadow-md">
      <h1 className="moderation-header text-2xl font-bold mb-6 flex items-center">
        <span className="text-2xl mr-2">🛡️</span> Content Moderation
      </h1>

      <div className="moderation-tabs flex space-x-4 mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'pending' 
              ? 'border-b-2 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Review
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'approved' 
              ? 'border-b-2 border-green-600 text-green-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'rejected' 
              ? 'border-b-2 border-red-600 text-red-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>

      {isLoading ? (
        <div className="loading text-center py-8 text-gray-600">Loading content for moderation...</div>
      ) : error ? (
        <div className="error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : reportedItems.length === 0 ? (
        <div className="no-content text-center py-8 text-gray-500">
          No {activeTab} content to display
        </div>
      ) : (
        <div className="reported-items space-y-4">
          {reportedItems.map(item => (
            <div key={item.id} className="reported-item border rounded-lg p-4 bg-gray-50">
              <div className="item-content">
                <h3 className="font-semibold text-lg">{item.type}: {item.title}</h3>
                <p className="mt-2 text-gray-700">{item.content}</p>
                <div className="reported-by mt-2 text-sm text-gray-500">
                  Reported by: {item.reportedBy} for {item.reason}
                </div>
              </div>

              {activeTab === 'pending' && (
                <div className="moderation-actions flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleModeration(item.id, 'approve')}
                    className="approve-button flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    <span className="mr-2">✅</span> Approve
                  </button>
                  <button 
                    onClick={() => handleModeration(item.id, 'reject')}
                    className="reject-button flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <span className="mr-2">❌</span> Reject
                  </button>
                  <button 
                    onClick={() => handleModeration(item.id, 'delete')}
                    className="delete-button flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    <span className="mr-2">🗑️</span> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Moderation.propTypes = {
  moderatorId: PropTypes.string.isRequired
};

export default Moderation;
