const mongoose = require('mongoose');

const AffiliationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Affiliation name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  logo: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  contactEmail: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
AffiliationSchema.index({ name: 1 }); // Standard index for name
AffiliationSchema.index({ name: 'text', description: 'text' }); // Text index for search
AffiliationSchema.index({ isActive: 1 });
AffiliationSchema.index({ 'members': 1 });

// Virtual for member count
AffiliationSchema.virtual('memberCount').get(function() {
  return this.members?.length || 0;
});

// Middleware to handle logo URL if using Cloudinary
AffiliationSchema.pre('save', function(next) {
  if (this.logo && !this.logo.startsWith('http')) {
    // If using Cloudinary from your .env
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      this.logo = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.logo}`;
    } else if (process.env.STORAGE_TYPE === 'render_disk') {
      this.logo = `${process.env.SERVER_URL}/uploads/affiliations/${this.logo}`;
    }
  }
  next();
});

// Static method to search affiliations
AffiliationSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true
  }, {
    score: { $meta: "textScore" }
  }).sort({
    score: { $meta: "textScore" }
  });
};

// Static method to get active affiliations
AffiliationSchema.statics.getActiveAffiliations = function() {
  return this.find({ isActive: true });
};

// Method to add a member
AffiliationSchema.methods.addMember = function(userId) {
  if (!this.members.includes(userId)) {
    this.members.push(userId);
  }
  return this.save();
};

// Method to remove a member
AffiliationSchema.methods.removeMember = function(userId) {
  this.members = this.members.filter(member => !member.equals(userId));
  return this.save();
};

module.exports = mongoose.model('Affiliation', AffiliationSchema);