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
  loading: false, // Start with false to avoid initial loading flash
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const initializedRef = React.useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initializeAuth = () => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'INIT_COMPLETE', payload: user });
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
      // Simulate API call
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

  const value = React.useMemo(() => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    updateUser,
    clearError
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
    logout: () => {},
    updateUser: () => {},
    clearError: () => {}
  };
};
