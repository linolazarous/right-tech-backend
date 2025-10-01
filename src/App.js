import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { setUserContext, clearUserContext } from './utils/sentry.js';
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
import ErrorBoundary from './components/ErrorBoundary.js';
import AdminPage from './pages/AdminPage.js';
import AdminLogin from './pages/AdminLogin.js'; // Make sure this file exists
import StudentLogin from './pages/StudentLogin.js';
import { AuthProvider } from './contexts/AuthContext.js';
import { AdminAuthProvider } from './contexts/AdminAuthContext.js'; // Make sure this exists
import { ThemeProvider } from './contexts/ThemeContext.js';
import AdminRoute from './components/AdminRoute.js'; // Make sure this exists

// A simple component for your 404 page
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Not Found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
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
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
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
                
                {/* Student Auth */}
                <Route path="/login" element={<StudentLogin />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  } 
                />
                
                {/* Fallback to old admin route for compatibility */}
                <Route path="/admin" element={<AdminPage />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary> 
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
