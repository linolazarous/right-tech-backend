import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_START':
      return { ...state, loading: true };
    case 'INIT_COMPLETE':
      return { ...state, loading: false, user: action.payload, isAuthenticated: !!action.payload };
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
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const initializedRef = React.useRef(false);

  // Your DigitalOcean backend URL
  const API_BASE_URL = 'https://righttechcentre-kn5oq.ondigitalocean.app/api';

  useEffect(() => {
    // Prevent double initialization
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // Verify token with backend
          try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.success) {
                dispatch({ type: 'INIT_COMPLETE', payload: data.user });
              } else {
                throw new Error('Token validation failed');
              }
            } else {
              throw new Error('Token invalid');
            }
          } catch (error) {
            console.warn('Token verification failed, using local storage:', error);
            // Fallback to local storage data
            const user = JSON.parse(userData);
            dispatch({ type: 'INIT_COMPLETE', payload: user });
          }
        } else {
          dispatch({ type: 'INIT_COMPLETE', payload: null });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'INIT_COMPLETE', payload: null });
      }
    };

    // Small delay to ensure React is ready
    setTimeout(initializeAuth, 0);
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Real API call to your DigitalOcean backend
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token || data.accessToken);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      return { user: data.user };
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please check your credentials and try again.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token || data.accessToken);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      return { user: data.user };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates) => {
    // Update local storage
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    // Update context state
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('authToken', data.token || data.accessToken);
        return data.token || data.accessToken;
      } else {
        logout(); // Token refresh failed, log out user
        return null;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  const value = React.useMemo(() => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    refreshToken
  }), [state.user, state.isAuthenticated, state.loading, state.error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ULTRA SAFE HOOK - Never throws errors
export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    if (context) {
      return context;
    }
  } catch (error) {
    console.warn('AuthContext error:', error);
  }
  
  // Fallback values
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {},
    updateUser: () => {},
    clearError: () => {},
    refreshToken: () => Promise.resolve(null)
  };
};
