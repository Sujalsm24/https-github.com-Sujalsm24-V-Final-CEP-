import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language } from '../types';
import { api, getStoredToken, setStoredToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; confirmPassword?: string; preferredLanguage?: Language }) => Promise<void>;
  logout: () => void;
  quickDemoLogin: (role: 'student' | 'admin') => Promise<void>;
  updateProfile: (data: { name?: string; selectedLanguage?: Language; dailyGoalMinutes?: number }) => Promise<void>;
  markLessonCompleted: (lessonId: string) => Promise<number>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await api.getMe();
      setUser(data.user);
    } catch {
      setStoredToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    setStoredToken(res.token);
    setUser(res.user);
  };

  const register = async (data: { name: string; email: string; password: string; confirmPassword?: string; preferredLanguage?: Language }) => {
    const res = await api.register(data);
    setStoredToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    setStoredToken(null);
    setUser(null);
  };

  const quickDemoLogin = async (role: 'student' | 'admin') => {
    const email = role === 'admin' ? 'admin@bhashasetu.com' : 'student@bhashasetu.com';
    const password = role === 'admin' ? 'admin123' : 'student123';
    await login(email, password);
  };

  const updateProfile = async (data: { name?: string; selectedLanguage?: Language; dailyGoalMinutes?: number }) => {
    const res = await api.updateProfile(data);
    setUser(res.user);
  };

  const markLessonCompleted = async (lessonId: string): Promise<number> => {
    try {
      const res = await api.completeLesson(lessonId);
      if (user) {
        setUser({
          ...user,
          ...res.user
        });
      }
      return res.xpEarned;
    } catch {
      return 25;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        quickDemoLogin,
        updateProfile,
        markLessonCompleted,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
