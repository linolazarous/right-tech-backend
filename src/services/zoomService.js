const axios = require('axios');

// Initialize Zoom client with JWT authentication (recommended for server-side)
const zoomClient = axios.create({
  baseURL: 'https://api.zoom.us/v2',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ZOOM_JWT_TOKEN}`
  }
});

exports.scheduleMeeting = async (data) => {
  try {
    // Validate required fields
    if (!data.topic || !data.start_time || !data.duration) {
      throw new Error('Missing required meeting fields');
    }

    // Set default meeting settings
    const meetingData = {
      topic: data.topic,
      type: 2, // Scheduled meeting
      start_time: data.start_time,
      duration: data.duration,
      timezone: data.timezone || 'UTC',
      password: data.password || generateRandomPassword(),
      settings: {
        host_video: data.settings?.host_video || false,
        participant_video: data.settings?.participant_video || false,
        join_before_host: data.settings?.join_before_host || false,
        mute_upon_entry: data.settings?.mute_upon_entry || false,
        waiting_room: data.settings?.waiting_room || true,
        ...data.settings
      }
    };

    const response = await zoomClient.post('/users/me/meetings', meetingData);
    return response.data;
  } catch (error) {
    console.error('Zoom API Error:', error.response?.data || error.message);
    throw new Error('Failed to schedule Zoom meeting');
  }
};

// Helper function to generate random meeting password
function generateRandomPassword() {
  return Math.random().toString(36).slice(2, 10);
}

module.exports = { scheduleMeeting };