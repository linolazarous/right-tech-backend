import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.js'; // MUST BE App.js
import initSentry from './utils/sentry.js'; // Proactively ensure utility files have .js
import './i18n/config.js'; // Proactively ensure config files have .js
import './assets/styles/global.css';

// === CRITICAL FIX: IMPORT YOUR CONTEXT PROVIDERS ===
import { AuthProvider } from './contexts/AuthContext.js'; // MUST BE AuthContext.js
import { ThemeProvider } from './contexts/ThemeContext.js'; // MUST BE ThemeContext.js
// =================================================

initSentry();

// IMPORTANT: Replace this with your actual reCAPTCHA v3 Site Key
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
          <ThemeProvider>
            <AuthProvider> 
              <App />
            </AuthProvider>
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
