const mongoose = require('mongoose');

const arLearningSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters'],
    minlength: [5, 'Title must be at least 5 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  arContentUrl: {
    type: String,
    required: [true, 'AR content URL is required'],
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  thumbnailUrl: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!'
    }
  },
  fileSize: {
    type: Number, // Size in bytes
    min: [0, 'File size cannot be negative']
  },
  duration: { // For AR experiences with time dimension
    type: Number, // In seconds
    min: [0, 'Duration cannot be negative']
  },
  markerType: { // For marker-based AR
    type: String,
    enum: ['image', 'object', 'location', 'face', 'none'],
    default: 'image'
  },
  markerImageUrl: { // For image-based AR markers
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!'
    }
  },
  targetPlatforms: { // Supported platforms
    type: [String],
    enum: ['ios', 'android', 'web', 'hololens', 'magicleap'],
    default: ['ios', 'android']
  },
  minOsVersion: String, // Minimum OS requirements
  categories: [{
    type: String,
    enum: ['education', 'medicine', 'engineering', 'art', 'history', 'science']
  }],
  interactivityLevel: { // Complexity of interaction
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  interactions: {
    type: Number,
    default: 0
  },
  compatibilityData: { // For storing device-specific compatibility info
    type: mongoose.Schema.Types.Mixed
  },
  metadata: { // For additional custom fields
    type: Map,
    of: String
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
arLearningSchema.index({ title: 'text', description: 'text' }); // Full-text search
arLearningSchema.index({ categories: 1 });
arLearningSchema.index({ markerType: 1 });
arLearningSchema.index({ isPublished: 1 });
arLearningSchema.index({ createdAt: -1 });

// Virtual for formatted file size
arLearningSchema.virtual('formattedFileSize').get(function() {
  if (!this.fileSize) return null;
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = this.fileSize;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
});

// Middleware to handle URL transformations
arLearningSchema.pre('save', function(next) {
  // Transform AR content URL if needed
  if (this.arContentUrl && !this.arContentUrl.startsWith('http')) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      this.arContentUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${this.arContentUrl}`;
    } else if (process.env.STORAGE_TYPE === 'render_disk') {
      this.arContentUrl = `${process.env.SERVER_URL}/uploads/ar-content/${this.arContentUrl}`;
    }
  }

  // Transform thumbnail URL if needed
  if (this.thumbnailUrl && !this.thumbnailUrl.startsWith('http')) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      this.thumbnailUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.thumbnailUrl}`;
    } else if (process.env.STORAGE_TYPE === 'render_disk') {
      this.thumbnailUrl = `${process.env.SERVER_URL}/uploads/ar-thumbnails/${this.thumbnailUrl}`;
    }
  }

  // Transform marker image URL if needed
  if (this.markerImageUrl && !this.markerImageUrl.startsWith('http')) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      this.markerImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.markerImageUrl}`;
    } else if (process.env.STORAGE_TYPE === 'render_disk') {
      this.markerImageUrl = `${process.env.SERVER_URL}/uploads/ar-markers/${this.markerImageUrl}`;
    }
  }

  next();
});

// Static method to get published AR experiences
arLearningSchema.statics.getPublished = function() {
  return this.find({ isPublished: true })
    .sort({ createdAt: -1 });
};

// Static method to get by category
arLearningSchema.statics.getByCategory = function(category) {
  return this.find({ 
    categories: category,
    isPublished: true 
  });
};

// Method to increment views
arLearningSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to increment interactions
arLearningSchema.methods.incrementInteractions = function() {
  this.interactions += 1;
  return this.save();
};

module.exports = mongoose.model('ARLearning', arLearningSchema);