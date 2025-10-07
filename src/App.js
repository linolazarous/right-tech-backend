import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import SentryErrorBoundary from './components/SentryErrorBoundary';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import ProfilePage from './pages/ProfilePage';
import LiveClass from './pages/LiveClass';
import ForumPage from './pages/ForumPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactPage from './pages/ContactPage';
import FormSuccess from './pages/FormSuccess';
import APITest from './components/APITest';
import AdminPage from './pages/AdminPage';
import { setUserContext, clearUserContext } from './utils/sentry.js';

function NotFound() {
  return (
    <div className="text-center p-16">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setUserContext({ id: user.id, email: user.email, username: user.username });
      } else {
        clearUserContext();
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      clearUserContext();
    }
  }, [location]);

  return (
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
  );
}

function App() {
  return (
    <SentryErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </SentryErrorBoundary>
  );
}

export default App;

