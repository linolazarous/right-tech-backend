import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleErrorBoundary from './components/SimpleErrorBoundary';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <SimpleErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </SimpleErrorBoundary>
  );
}

export default App;
