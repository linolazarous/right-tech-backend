import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Replace SimpleAuthProvider with your actual AuthProvider
// Replace SimpleThemeProvider with your actual ThemeProvider
// Keep the simple providers for now
const AuthContext = React.createContext();
const ThemeContext = React.createContext();

function SimpleAuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  
  const value = {
    user,
    login: () => setUser({ id: 1, email: 'test@test.com' }),
    logout: () => setUser(null),
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function SimpleThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  
  const value = {
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <SimpleThemeProvider>
      <SimpleAuthProvider>
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
      </SimpleAuthProvider>
    </SimpleThemeProvider>
  );
}

export default App;


