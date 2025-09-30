import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        isAuthenticated: true, 
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false 
      };
    case 'LOGOUT':
      return { 
        user: null, 
        isAuthenticated: false, 
        loading: false,
        error: null 
      };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: { ...state.user, ...action.payload } 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start with loading true
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Simulate checking for existing auth
        await new Promise(resolve => setTimeout(resolve, 500));
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: 1,
        email: credentials.email,
        username: credentials.email.split('@')[0]
      };
      localStorage.setItem('userData', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      return { user: mockUser };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    updateUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// SAFE HOOK - returns defaults instead of throwing errors
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Return default values if no provider found
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: () => console.warn('AuthProvider not available'),
      logout: () => console.warn('AuthProvider not available'),
      updateUser: () => console.warn('AuthProvider not available'),
      clearError: () => console.warn('AuthProvider not available')
    };
  }
  return context;
};
