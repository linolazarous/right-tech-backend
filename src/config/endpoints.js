// src/config/endpoints.js

/**
 * Global API Endpoint Configuration
 * 
 * Centralized API paths for all modules in the Right Tech Centre platform.
 * Ensures consistency, scalability, and easier version upgrades.
 */

const API_VERSION = '/api/v1';

export const API_ENDPOINTS = {
  // ======================
  // 🔐 AUTHENTICATION
  // ======================
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/register`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    PROFILE: `${API_VERSION}/auth/profile`,
    REFRESH: `${API_VERSION}/auth/refresh`,
  },

  // ======================
  // 👤 USER MANAGEMENT
  // ======================
  USERS: {
    BASE: `${API_VERSION}/users`,
    PROFILE: `${API_VERSION}/users/profile`,
    UPDATE: `${API_VERSION}/users/update`,
    DELETE: `${API_VERSION}/users/delete`,
    getUserById: (id) => `${API_VERSION}/users/${id}`,
    search: (query) => `${API_VERSION}/users/search?q=${encodeURIComponent(query)}`,
  },

  // ======================
  // 🧠 ADMIN MODULE
  // ======================
  ADMIN: {
    DASHBOARD: `${API_VERSION}/admin/dashboard`,
    USERS: `${API_VERSION}/admin/users`,
    STATS: `${API_VERSION}/admin/stats`,
    COURSES: `${API_VERSION}/admin/courses`,
    SETTINGS: `${API_VERSION}/admin/settings`,
    ANALYTICS: `${API_VERSION}/admin/analytics`,
  },

  // ======================
  // 📘 COURSES & LEARNING
  // ======================
  COURSES: {
    LIST: `${API_VERSION}/courses`,
    DETAIL: (id) => `${API_VERSION}/courses/${id}`,
    ENROLL: (id) => `${API_VERSION}/courses/${id}/enroll`,
    PROGRESS: (id) => `${API_VERSION}/courses/${id}/progress`,
    MODULES: (id) => `${API_VERSION}/courses/${id}/modules`,
    RECOMMENDATIONS: `${API_VERSION}/courses/recommended`,
  },

  // ======================
  // 🧑‍🏫 LIVE CLASSES & ZOOM INTEGRATION
  // ======================
  LIVE_CLASSES: {
    LIST: `${API_VERSION}/live-classes`,
    JOIN: (id) => `${API_VERSION}/live-classes/${id}/join`,
    SCHEDULE: `${API_VERSION}/live-classes/schedule`,
    CREATE: `${API_VERSION}/live-classes/create`,
  },

  // ======================
  // 💬 COMMUNITY FORUM
  // ======================
  FORUM: {
    POSTS: `${API_VERSION}/forum/posts`,
    CREATE: `${API_VERSION}/forum/posts/create`,
    DETAIL: (id) => `${API_VERSION}/forum/posts/${id}`,
    COMMENTS: (id) => `${API_VERSION}/forum/posts/${id}/comments`,
    LIKE: (id) => `${API_VERSION}/forum/posts/${id}/like`,
    TAGS: `${API_VERSION}/forum/tags`,
  },

  // ======================
  // 🧾 PAYMENTS & BILLING
  // ======================
  PAYMENTS: {
    STRIPE_CHECKOUT: `${API_VERSION}/payments/checkout`,
    SUBSCRIPTION: `${API_VERSION}/payments/subscription`,
    HISTORY: `${API_VERSION}/payments/history`,
    INVOICE: (id) => `${API_VERSION}/payments/invoice/${id}`,
  },

  // ======================
  // 🧩 AI & AUTOMATION
  // ======================
  AI: {
    GENERATE_COURSE: `${API_VERSION}/ai/generate-course`,
    PERSONALIZE_LEARNING: `${API_VERSION}/ai/personalize`,
    RECOMMEND_COURSES: `${API_VERSION}/ai/recommendations`,
    ANALYTICS: `${API_VERSION}/ai/analytics`,
  },

  // ======================
  // 🪙 BLOCKCHAIN CERTIFICATION
  // ======================
  CERTIFICATION: {
    ISSUE: `${API_VERSION}/certificates/issue`,
    VERIFY: `${API_VERSION}/certificates/verify`,
    HISTORY: `${API_VERSION}/certificates/history`,
    getByUser: (userId) => `${API_VERSION}/certificates/user/${userId}`,
  },

  // ======================
  // 📬 CONTACT & SUPPORT
  // ======================
  CONTACT: {
    SEND: `${API_VERSION}/contact`,
    SUPPORT_TICKETS: `${API_VERSION}/support/tickets`,
    FAQ: `${API_VERSION}/support/faq`,
  },

  // ======================
  // 🌐 GLOBAL SEARCH
  // ======================
  SEARCH: {
    ALL: (query) => `${API_VERSION}/search?q=${encodeURIComponent(query)}`,
    COURSES: (query) => `${API_VERSION}/search/courses?q=${encodeURIComponent(query)}`,
    USERS: (query) => `${API_VERSION}/search/users?q=${encodeURIComponent(query)}`,
  },

  // ======================
  // ⚙️ SYSTEM HEALTH
  // ======================
  SYSTEM: {
    STATUS: `${API_VERSION}/system/status`,
    CONFIG: `${API_VERSION}/system/config`,
  },
};

export default API_ENDPOINTS;
