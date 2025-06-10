const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'],
    index: true
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    index: true
  },
  lessonId: {  // New field for granular tracking
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    index: true
  },
  activityType: {  // Renamed from 'activity' for clarity
    type: String,
    required: [true, 'Activity type is required'],
    enum: [
      'course_view',
      'lesson_start',
      'lesson_complete',
      'quiz_attempt',
      'resource_download',
      'video_play',
      'certificate_earned',
      'enrollment',
      'completion',
      'search',
      'login',
      'logout'
    ]
  },
  activityDetails: {  // New field for additional context
    type: mongoose.Schema.Types.Mixed
  },
  duration: {  // New field for time spent
    type: Number,  // in seconds
    min: 0
  },
  deviceInfo: {  // New field for device tracking
    type: {
      platform: String,
      browser: String,
      isMobile: Boolean
    }
  },
  ipAddress: {  // New field for geo-analytics
    type: String,
    trim: true
  },
  metadata: {  // Flexible field for future extensions
    type: Map,
    of: String
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true  // Important for time-based queries
  }
}, {
  timestamps: false,  // We're using our own timestamp field
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for common query patterns
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ courseId: 1, activityType: 1 });
analyticsSchema.index({ timestamp: -1, activityType: 1 });

// Virtual for formatted date (useful in reporting)
analyticsSchema.virtual('date').get(function() {
  return this.timestamp.toISOString().split('T')[0];
});

// Pre-save hook to clean data
analyticsSchema.pre('save', function(next) {
  // Truncate IP address for privacy if needed
  if (this.ipAddress) {
    this.ipAddress = this.ipAddress.split(',').shift().trim();
  }
  next();
});

// Static method to get user activity
analyticsSchema.statics.getUserActivity = function(userId, limit = 100) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('courseId', 'title slug')
    .populate('lessonId', 'title');
};

// Static method for course engagement analytics
analyticsSchema.statics.getCourseAnalytics = function(courseId) {
  return this.aggregate([
    { $match: { courseId: mongoose.Types.ObjectId(courseId) } },
    {
      $group: {
        _id: '$activityType',
        count: { $sum: 1 },
        totalDuration: { $sum: '$duration' },
        lastActivity: { $max: '$timestamp' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Static method for daily activity counts
analyticsSchema.statics.getDailyActivity = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);

  return this.aggregate([
    { $match: { timestamp: { $gte: date } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
        count: { $sum: 1 },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $project: {
        date: '$_id',
        count: 1,
        uniqueUsersCount: { $size: '$uniqueUsers' }
      }
    },
    { $sort: { date: 1 } }
  ]);
};

module.exports = mongoose.model('Analytics', analyticsSchema);