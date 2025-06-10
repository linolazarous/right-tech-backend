const mongoose = require('mongoose');

const accessibilitySettingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true,
    index: true // Add index for faster queries
  },
  highContrastMode: { 
    type: Boolean, 
    default: false 
  },
  fontSize: { 
    type: String, 
    enum: {
      values: ['small', 'medium', 'large'],
      message: 'Font size must be either small, medium, or large'
    }, 
    default: 'medium' 
  },
  screenReaderEnabled: { 
    type: Boolean, 
    default: false 
  },
  colorTheme: {  // New suggested field
    type: String,
    enum: ['light', 'dark', 'high-contrast'],
    default: 'light'
  },
  keyboardNavigation: {  // New suggested field
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    immutable: true // Prevents modification
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: false, // We're handling timestamps manually
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update the `updatedAt` field before saving
accessibilitySettingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Static method for finding by user ID
accessibilitySettingSchema.statics.findByUserId = async function(userId) {
  try {
    return await this.findOne({ userId });
  } catch (error) {
    throw new Error(`Error finding accessibility settings: ${error.message}`);
  }
};

// Add text index if you need search functionality
// accessibilitySettingSchema.index({ '$**': 'text' });

module.exports = mongoose.model('AccessibilitySetting', accessibilitySettingSchema);