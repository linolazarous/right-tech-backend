import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

// Create contexts
const AuthContext = React.createContext();
const ThemeContext = React.createContext();

// Safe hooks that won't crash if provider is missing
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      login: () => {},
      logout: () => {},
      updateUser: () => {}
    };
  }
  return context;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      theme: 'light',
      toggleTheme: () => {},
      isDark: false
    };
  }
  return context;
};

function SimpleAuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser: setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function SimpleThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load theme from localStorage
    try {
      const savedTheme = localStorage.getItem('righttech-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Apply theme to document
    try {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('righttech-theme', theme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    loading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Right Tech Centre...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { loading: authLoading } = useAuth();
  const { loading: themeLoading } = useTheme();

  // Show loading screen while contexts are initializing
  if (authLoading || themeLoading) {
    return <LoadingScreen />;
  }

  return (
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
  );
}

function App() {
  return (
    <SimpleThemeProvider>
      <SimpleAuthProvider>
        <Router>
          <AppContent />
        </Router>
      </SimpleAuthProvider>
    </SimpleThemeProvider>
  );
}

export default App;
