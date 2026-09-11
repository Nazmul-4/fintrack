// AuthContext.tsx — Provides global authentication state to the entire app

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import type { User } from 'firebase/auth';

import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for login/logout/page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (
    email: string,
    password: string
  ): Promise<User> => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return result.user;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return result.user;
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}