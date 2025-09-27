import api from './api.js';

export const sendNotification = async (userId, message) => {
  try {
    const response = await api.post('/notifications/send', { userId, message });
    return response.data;
  } catch (error) {
    console.error('Failed to send push notification:', error);
    throw new Error(error.response?.data?.message || 'Failed to send notification');
  }
};

