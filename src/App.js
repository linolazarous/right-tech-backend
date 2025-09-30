import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Super simple contexts directly in App.js
const AuthContext = createContext();
const ThemeContext = createContext();

function SimpleAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
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
  const [theme, setTheme] = useState('light');
  
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

function SimpleHome() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Right Tech Centre - Working!</h1>
      <p>React is now working with contexts!</p>
    </div>
  );
}

function App() {
  return (
    <SimpleThemeProvider>
      <SimpleAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
          </Routes>
        </Router>
      </SimpleAuthProvider>
    </SimpleThemeProvider>
  );
}

export default App;
