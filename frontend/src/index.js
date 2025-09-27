import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
// --- ALL LOCAL IMPORTS MUST HAVE .JS EXTENSION ---
import App from './App.js'; // MUST HAVE .js
import initSentry from './utils/sentry.js'; // <- MISSING .js
import './i18n/config.js'; // <- MISSING .js (if config is a JS file)
import './assets/styles/global.css'; // OK (CSS/Assets don't need .js)

// --- Context Providers (Add these back if you removed them for testing) ---
// import { AuthProvider } from './contexts/AuthContext.js'; 
// import { ThemeProvider } from './contexts/ThemeContext.js'; 

// Initialize Sentry error tracking and performance monitoring
initSentry();

// IMPORTANT: Replace this with your actual reCAPTCHA v3 Site Key
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_V3_SITE_KEY';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Re-add your main providers here! */}
    {/* <AuthProvider> */}
    {/* <ThemeProvider> */}
      <HelmetProvider>
        <BrowserRouter>
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
    {/* </ThemeProvider> */}
    {/* </AuthProvider> */}
  </React.StrictMode>
);
