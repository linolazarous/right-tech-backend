import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef } from 'react';

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
      return { ...state, loading: false, admin: action.payload, isAdminAuthenticated: true, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isAdminAuthenticated: false };
    case 'LOGOUT':
      return { admin: null, isAdminAuthenticated: false, loading: false, error: null };
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
  const initializedRef = useRef(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://righttechcentre-kn5oq.ondigitalocean.app/api';

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initAdmin = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');

        if (token && adminData) {
          try {
            const res = await fetch(`${API_BASE_URL}/admin/me`, {
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const admin = res.ok ? await res.json() : null;
            if (!res.ok) {
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminData');
            }
            dispatch({ type: 'INIT_COMPLETE', payload: admin || JSON.parse(adminData) });
          } catch (error) {
            console.warn('Admin token verification failed:', error);
            dispatch({ type: 'INIT_COMPLETE', payload: JSON.parse(adminData) });
          }
        } else {
          dispatch({ type: 'INIT_COMPLETE', payload: null });
        }
      } catch (error) {
        console.error('Admin initialization error:', error);
        dispatch({ type: 'INIT_COMPLETE', payload: null });
      }
    };

    initAdmin();
  }, [API_BASE_URL]);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || 'Admin login failed');

      localStorage.setItem('adminToken', data.token || data.accessToken);
      localStorage.setItem('adminData', JSON.stringify(data.admin || data.user));

      dispatch({ type: 'LOGIN_SUCCESS', payload: data.admin || data.user });
      return { admin: data.admin || data.user };
    } catch (error) {
      const msg = error.message || 'Admin login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: msg });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  const value = useMemo(() => ({
    admin: state.admin,
    isAdminAuthenticated: state.isAdminAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  }), [state]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    return {
      admin: null,
      isAdminAuthenticated: false,
      loading: false,
      error: null,
      login: () => Promise.resolve(),
      logout: () => {},
      clearError: () => {}
    };
  }
  return context;
};
