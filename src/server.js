// =================================================================
//                      Imports & Configuration
// =================================================================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
const winston = require('winston');

// =================================================================
//                            Logging Setup
// =================================================================
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // In production, you'd likely want to write to a file or a logging service
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If not in production, also log to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// =================================================================
//                      Initialize Express App
// =================================================================
const app = express();
const PORT = process.env.PORT || 5500;

// =================================================================
//                         Database Connections
// =================================================================

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/righttechcentre';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Mongoose 6 no longer supports the following options:
  // useCreateIndex: true,
  // useFindAndModify: false,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => logger.info('✅ MongoDB Connected'))
.catch(err => logger.error('❌ MongoDB Connection Error:', { message: err.message }));

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection lost. Attempting to reconnect...');
});

// --- PostgreSQL Connection Pool ---
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render provides this env var automatically
  ssl: {
    rejectUnauthorized: false // Required for Render's managed Postgres
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pgPool.on('connect', () => {
  logger.info('✅ PostgreSQL Pool Connected');
});

pgPool.on('error', (err) => {
  logger.error('❌ PostgreSQL Pool Error:', { message: err.message });
});

// =================================================================
//                         Core Middleware
// =================================================================
app.use(helmet()); // Sets various security-related HTTP headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || true, // Use environment variable for allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(compression()); // Compresses response bodies
app.use(express.json({ limit: '20kb' })); // Parses incoming JSON requests, with a reasonable size limit
app.use(express.urlencoded({ extended: true, limit: '20kb' })); // Parses urlencoded payloads

// =================================================================
//                         Rate Limiting
// =================================================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // More stringent limit for auth routes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts from this IP, please try again after 15 minutes.' }
});

app.use('/api/', apiLimiter); // Apply general rate limiting to all API routes

// =================================================================
//                            API Routes
// =================================================================
// INFO: Import your route files here. Example:
// const userRoutes = require('./routes/userRoutes');
// const courseRoutes = require('./routes/courseRoutes');

// INFO: Apply routes and specific middleware here. Example:
// app.use('/api/auth', authLimiter, authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);

// Example Routes (from your App.js)
app.get('/api/mongo/users', async (req, res, next) => {
  try {
    // const User = require('./models/UserModel'); // Assume this model exists
    // const users = await User.find().lean();
    res.json({ success: true, count: 0, data: [] }); // Placeholder
  } catch (err) { next(err); }
});

app.get('/api/pg/users', async (req, res, next) => {
  try {
    const { rows } = await pgPool.query('SELECT * FROM Users LIMIT 10;'); // Using your schema table
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { next(err); }
});


// =================================================================
//                         Health Check Endpoint
// =================================================================
app.get('/health', async (req, res) => {
  try {
    // Check MongoDB
    await mongoose.connection.db.admin().ping();
    const mongoState = 'CONNECTED';

    // Check PostgreSQL
    const pgClient = await pgPool.connect();
    await pgClient.query('SELECT 1');
    pgClient.release();
    const pgState = 'CONNECTED';

    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      databases: {
        mongodb: mongoState,
        postgresql: pgState
      }
    });
  } catch (err) {
    logger.error('Health check failed:', { message: err.message });
    res.status(503).json({
      status: 'DOWN',
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});


// =================================================================
//                       Static File Serving
// =================================================================
app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: '1y', // Cache for 1 year
}));


// =================================================================
//                         Error Handling
// =================================================================

// 404 Handler for requests that don't match any route
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found. The requested URL was not found on this server.',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Log the error
  logger.error(err.message, { stack: err.stack, path: req.originalUrl });

  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  // For production, don't send stack traces to the client
  if (process.env.NODE_ENV === 'production' && !isOperational) {
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});


// =================================================================
//                         Server Initialization
// =================================================================
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// =================================================================
//                         Graceful Shutdown
// =================================================================
const shutdown = async (signal) => {
  logger.warn(`🛑 ${signal} received. Shutting down gracefully...`);

  // 1. Stop accepting new connections
  server.close(async () => {
    logger.info('⛔ HTTP server closed.');

    // 2. Close database connections
    try {
      await mongoose.disconnect();
      logger.info('⛔ MongoDB connection closed.');
    } catch (err) {
      logger.error('Error closing MongoDB connection:', { message: err.message });
    }

    try {
      await pgPool.end();
      logger.info('⛔ PostgreSQL pool closed.');
    } catch (err) {
      logger.error('Error closing PostgreSQL pool:', { message: err.message });
    }

    // 3. Exit process
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM')); // For Render, Heroku, etc.
process.on('SIGINT', () => shutdown('SIGINT'));   // For local development (Ctrl+C)

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', { promise, reason: reason.stack || reason });
    // It's often recommended to crash on unhandled rejections
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', { message: err.stack || err });
    // Mandatory shutdown on uncaught exceptions
    process.exit(1);
});

module.exports = { app, pgPool, mongoose };
