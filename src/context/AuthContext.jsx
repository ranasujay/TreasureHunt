import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('treasureHuntUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('treasureHuntUser');
      }
    }
    setLoading(false);
  }, []);

  const checkAuth = async () => {
    const storedUser = localStorage.getItem('treasureHuntUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        return true;
      } catch (error) {
        localStorage.removeItem('treasureHuntUser');
        return false;
      }
    }
    return false;
  };

  const login = (userData) => {
    const userObj = {
      name: userData.name,
      currLevel: userData.currLevel || userData.level,
    };
    setUser(userObj);
    localStorage.setItem('treasureHuntUser', JSON.stringify(userObj));
  };

  const register = async (name, password) => {
    try {
      const response = await authAPI.register(name, password);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('treasureHuntUser');
    navigate('/');
  };

  const updateLevel = (newLevel) => {
    const updatedUser = {
      ...user,
      currLevel: newLevel,
    };
    setUser(updatedUser);
    localStorage.setItem('treasureHuntUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateLevel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
