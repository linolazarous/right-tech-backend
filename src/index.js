import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.js'; // Added .js extension for consistency
import initSentry from './utils/sentry.js'; // Added .js extension
import './i18n/config.js'; // Added .js extension
import './assets/styles/global.css'; // Assuming this is your main CSS file

// Initialize Sentry error tracking and performance monitoring
initSentry();

// IMPORTANT: Replace this with your actual reCAPTCHA v3 Site Key
// NOTE: This must be properly set as an environment variable in your Vercel deployment
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_V3_SITE_KEY';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      {/* 1. BrowserRouter is REQUIRED for App.js to use Routes/Route */}
      <BrowserRouter> 
        {/* 2. GoogleReCaptchaProvider is REQUIRED if used in any child component */}
        <GoogleReCaptchaProvider 
          reCaptchaKey={RECAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
          }}
        >
          <App />
        </GoogleReCaptchaProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

