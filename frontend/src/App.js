import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.js'; // Added .js
import CoursePage from './pages/CoursePage.js'; // Added .js
// ... (All other local imports need .js extension)
import { setUserContext, clearUserContext } from './utils/sentry.js'; // Added .js
import SentryErrorBoundary from './components/ErrorBoundary.js'; // Added .js
import AdminPage from './pages/AdminPage.js'; // Added .js

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

          {/* 2. ADD THE ADMIN ROUTE HERE */}
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



