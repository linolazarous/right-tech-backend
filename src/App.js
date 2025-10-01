import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // External library
import { setUserContext, clearUserContext } from './utils/sentry.js'; // Utility
import HomePage from './pages/HomePage.js';
import CoursePage from './pages/CoursePage.js';
import ProfilePage from './pages/ProfilePage.js';
import LiveClass from './pages/LiveClass.js';
import ForumPage from './pages/ForumPage.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import TermsOfService from './pages/TermsOfService.js';
import ContactPage from './pages/ContactPage.js';
import FormSuccess from './pages/FormSuccess.js';
import APITest from './components/APITest.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ErrorBoundary from './components/ErrorBoundary.js'; // Assuming Sentry is wrapped/initialized here
import AdminPage from './pages/AdminPage.js';
import { AuthProvider } from './contexts/AuthContext.js'; // Context added
import { ThemeProvider } from './contexts/ThemeContext.js'; // Context added

// A simple component for your 404 page
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Reinstated localStorage logic for user context
  React.useEffect(() => {
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setUserContext({ id: user.id, email: user.email, username: user.username });
        } else {
            clearUserContext();
        }
    } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        clearUserContext();
    }
  }, [location]);

  return (
    // Moved AuthProvider and ThemeProvider inside AppContent for clear Context usage
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/live-class" element={<LiveClass />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/success" element={<FormSuccess />} />
              <Route path="/api-test" element={<APITest />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    // ErrorBoundary wraps the entire functional application
    <ErrorBoundary> 
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;

