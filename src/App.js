import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<HomePage />} />
                <Route path="/forum" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/login" element={<HomePage />} />
                <Route path="/profile" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
