import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AdminAuthContext = createContext();

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_START':
      return { ...state, loading: true };
    case 'INIT_COMPLETE':
      return { ...state, loading: false, admin: action.payload, isAdminAuthenticated: !!action.payload };
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        admin: action.payload, 
        isAdminAuthenticated: true, 
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAdminAuthenticated: false 
      };
    case 'LOGOUT':
      return { 
        admin: null, 
        isAdminAuthenticated: false, 
        loading: false,
        error: null 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  admin: null,
  isAdminAuthenticated: false,
  loading: false,
  error: null
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);
  const initializedRef = React.useRef(false);

  // Your DigitalOcean backend URL
  const API_BASE_URL = 'https://righttechcentre-kn5oq.ondigitalocean.app/api';

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initializeAdminAuth = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          // Verify admin token with backend
          const response = await fetch(`${API_BASE_URL}/admin/me`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          });
          
          if (response.ok) {
            const admin = await response.json();
            dispatch({ type: 'INIT_COMPLETE', payload: admin });
          } else {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
            dispatch({ type: 'INIT_COMPLETE', payload: null });
          }
        } else {
          dispatch({ type: 'INIT_COMPLETE', payload: null });
        }
      } catch (error) {
        console.error('Admin auth initialization error:', error);
        dispatch({ type: 'INIT_COMPLETE', payload: null });
      }
    };

    setTimeout(initializeAdminAuth, 0);
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Admin login API call
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      // Store admin token and data separately
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.admin });
      return { admin: data.admin };
    } catch (error) {
      const errorMessage = error.message || 'Admin login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = React.useMemo(() => ({
    admin: state.admin,
    isAdminAuthenticated: state.isAdminAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  }), [state.admin, state.isAdminAuthenticated, state.loading, state.error]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  try {
    const context = useContext(AdminAuthContext);
    if (context) {
      return context;
    }
  } catch (error) {
    console.warn('AdminAuthContext error:', error);
  }
  
  // Fallback values
  return {
    admin: null,
    isAdminAuthenticated: false,
    loading: false,
    error: null,
    login: () => Promise.resolve(),
    logout: () => {},
    clearError: () => {}
  };
};
