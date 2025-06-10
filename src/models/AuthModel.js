const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never return password in queries
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'editor'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  devices: [{
    deviceId: String,
    userAgent: String,
    ipAddress: String,
    lastAccessed: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
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

// Indexes
authSchema.index({ email: 1 }, { unique: true });
authSchema.index({ role: 1 });
authSchema.index({ isVerified: 1 });
authSchema.index({ isActive: 1 });

// Middleware to hash password before saving
authSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000; // Ensure token is created after
    next();
  } catch (err) {
    next(err);
  }
});

// Update the updatedAt field before saving
authSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check password
authSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after token was issued
authSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create JWT token
authSchema.methods.createAuthToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Instance method to create refresh token
authSchema.methods.createRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );
};

// Instance method to create password reset token
authSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Instance method to create email verification token
authSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');

  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Static method to find by credentials (for login)
authSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email }).select('+password +isActive +loginAttempts +lockUntil');

  if (!user || !user.isActive) {
    throw new Error('Invalid credentials or account inactive');
  }

  // Check if account is temporarily locked
  if (user.lockUntil && user.lockUntil > Date.now()) {
    const remainingTime = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
    throw new Error(`Account temporarily locked. Try again in ${remainingTime} minutes`);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    // Increment login attempts
    user.loginAttempts += 1;
    
    // Lock account after 5 failed attempts for 30 minutes
    if (user.loginAttempts >= 5) {
      user.lockUntil = Date.now() + 30 * 60 * 1000;
      await user.save();
      throw new Error('Account locked due to too many failed attempts. Try again later');
    }

    await user.save();
    throw new Error('Invalid credentials');
  }

  // Reset login attempts on successful login
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = new Date();
  await user.save();

  return user;
};

// Virtual for whether account is locked
authSchema.virtual('isLocked').get(function() {
  return this.lockUntil && this.lockUntil > Date.now();
});

module.exports = mongoose.model('Auth', authSchema);