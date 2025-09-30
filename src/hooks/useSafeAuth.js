import { useAuth as useOriginalAuth } from '../contexts/AuthContext';

// Safe version that catches errors
export const useSafeAuth = () => {
  try {
    return useOriginalAuth();
  } catch (error) {
    // Return safe defaults if hook fails
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
      clearError: () => {}
    };
  }
};
