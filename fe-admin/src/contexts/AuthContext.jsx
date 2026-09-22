import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const callbackToken = hashParams.get('token');
      const userData = localStorage.getItem('adminUser');

      if (callbackToken) {
        localStorage.setItem('adminUser', JSON.stringify({ token: callbackToken }));
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }

      const storedUserData = callbackToken
        ? { token: callbackToken }
        : userData && JSON.parse(userData);
      if (storedUserData) {
        const parsedUser = storedUserData;
        if (parsedUser?.token) {
          try {
            const response = await api.get('/users/profile');
            // Kiểm tra role admin
            if (response.data.role === 'admin') {
              const authenticatedUser = { ...response.data, token: parsedUser.token };
              setUser(authenticatedUser);
              localStorage.setItem('adminUser', JSON.stringify(authenticatedUser));
            } else {
              logout();
            }
          } catch (error) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    if (userData?.token && userData?.role === 'admin') {
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);