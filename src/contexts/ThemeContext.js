import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const initializedRef = React.useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const savedTheme = localStorage.getItem('righttech-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }, []);

  useEffect(() => {
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

  const value = React.useMemo(() => ({
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ULTRA SAFE HOOK - Never throws errors
export const useTheme = () => {
  try {
    const context = useContext(ThemeContext);
    if (context) {
      return context;
    }
  } catch (error) {
    console.warn('ThemeContext error:', error);
  }
  
  // Fallback values
  return {
    theme: 'light',
    toggleTheme: () => {},
    isDark: false
  };
};
