// contexts/Providers.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import { AdminAuthProvider } from './AdminAuthContext';
import { ThemeProvider } from './ThemeContext';

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
};
