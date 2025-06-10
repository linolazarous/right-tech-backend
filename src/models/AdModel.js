const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Ad title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: { 
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  targetAudience: {  // New field for ad targeting
    type: [String],
    enum: ['all', 'students', 'professionals', 'developers', 'designers'],
    default: ['all']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clicks: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
adSchema.index({ title: 'text', description: 'text' });
adSchema.index({ isActive: 1 });
adSchema.index({ startDate: 1, endDate: 1 });

// Virtual for checking if ad is currently active
adSchema.virtual('isLive').get(function() {
  const now = new Date();
  return this.isActive && 
         (!this.startDate || this.startDate <= now) && 
         (!this.endDate || this.endDate >= now);
});

// Middleware to handle image URLs if using Cloudinary
adSchema.pre('save', function(next) {
  if (this.imageUrl && !this.imageUrl.startsWith('http')) {
    // If using Cloudinary from your .env
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      this.imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.imageUrl}`;
    } else if (process.env.STORAGE_TYPE === 'render_disk') {
      this.imageUrl = `${process.env.SERVER_URL}/uploads/${this.imageUrl}`;
    }
  }
  next();
});

// Static method to get active ads
adSchema.statics.getActiveAds = function() {
  const now = new Date();
  return this.find({
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: null },
      { endDate: { $gte: now } }
    ]
  });
};

// Method to increment clicks
adSchema.methods.incrementClicks = function() {
  this.clicks += 1;
  return this.save();
};

// Method to increment impressions
adSchema.methods.incrementImpressions = function() {
  this.impressions += 1;
  return this.save();
};

module.exports = mongoose.model('Ad', adSchema);