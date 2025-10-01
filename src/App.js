import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Ultra-simple providers that never fail
const AuthContext = React.createContext();
const ThemeContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context || {
    user: null,
    isAuthenticated: false,
    loading: false,
    login: () => Promise.resolve({ user: { id: 1, email: 'test@test.com' } }),
    logout: () => {},
    updateUser: () => {}
  };
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  return context || {
    theme: 'light',
    toggleTheme: () => {},
    isDark: false
  };
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  
  const value = {
    user,
    isAuthenticated: !!user,
    loading: false,
    login: () => {
      const newUser = { id: 1, email: 'user@righttech.com', username: 'user' };
      setUser(newUser);
      return Promise.resolve({ user: newUser });
    },
    logout: () => setUser(null),
    updateUser: setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  
  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const value = {
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light'),
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Simple components that definitely work
function SimpleNavbar() {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Right Tech Centre</div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 bg-indigo-500 rounded"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <button 
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={login}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function SimpleHomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Right Tech Centre
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Affordable Tech Certifications, Diplomas & Degrees
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Certifications</h3>
            <p>Industry-recognized certifications to boost your career</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Diplomas</h3>
            <p>Comprehensive diploma programs for in-depth learning</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Degrees</h3>
            <p>Advanced degree programs for professional growth</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SimpleFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Right Tech Centre. All rights reserved.</p>
        <p className="mt-2 text-gray-400">
          Empowering the next generation of tech professionals
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <SimpleNavbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<SimpleHomePage />} />
                <Route path="/courses" element={<SimpleHomePage />} />
                <Route path="/profile" element={<SimpleHomePage />} />
              </Routes>
            </main>
            <SimpleFooter />
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
