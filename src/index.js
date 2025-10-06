import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.js';
import RootErrorBoundary from './components/RootErrorBoundary.js';
import initSentry from './utils/sentry.js';
import { AppProviders } from './contexts/Providers.js';
import './i18n/config.js';
import './assets/styles/global.css';

// Initialize Sentry
initSentry();

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LcJQp8qAAAAAK7XdP4q7q2N7R0xqY6Z6Z6Z6Z6Z6';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found in public/index.html');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RootErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <GoogleReCaptchaProvider 
              reCaptchaKey={RECAPTCHA_SITE_KEY} 
              scriptProps={{ async: true, defer: true, appendTo: 'head' }}
            >
              <AppProviders>
                <App />
              </AppProviders>
            </GoogleReCaptchaProvider>
          </BrowserRouter>
        </HelmetProvider>
      </RootErrorBoundary>
    </React.StrictMode>
  );
  console.log('✅ Application mounted successfully');
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  rootElement.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
      <h1 style="color: #e74c3c;">Application Failed to Load</h1>
      <p>We're sorry, but the application failed to initialize. Please refresh the page or contact support.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
    }
