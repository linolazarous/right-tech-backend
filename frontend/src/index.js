import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.js'; // === CRITICAL FIX: ADDED .js EXTENSION
import initSentry from './utils/sentry'; 
import './i18n/config';
import './assets/styles/global.css';

// === CRITICAL FIX: IMPORT YOUR CONTEXT PROVIDERS ===
// These imports are confirmed by the files you provided.
import { AuthProvider } from './contexts/AuthContext'; 
import { ThemeProvider } from './contexts/ThemeContext';
// =================================================

initSentry();

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_V3_SITE_KEY';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
          {/* === CRITICAL FIX: WRAP APP IN DATA PROVIDERS === */}
          {/* ThemeProvider and AuthProvider are correctly imported and nested. */}
          <ThemeProvider>
            <AuthProvider> 
              <App />
            </AuthProvider>
          </ThemeProvider>
          {/* ================================================== */}
        </GoogleReCaptchaProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
