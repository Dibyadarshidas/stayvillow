'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'host' | 'user';
  verified: boolean;
  profileCompletion: number;
  rewards: {
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    points: number;
    nextTierPoints: number;
  };
}

interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  isAdmin: boolean;
  isHost: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for development purposes
const DEMO_USER: User = {
  id: '1',
  name: 'Dibyadarshi',
  email: 'dibyadarshi@gmail.com',
  role: 'user',
  verified: true,
  profileCompletion: 70,
  rewards: {
    tier: 'Gold',
    points: 1250,
    nextTierPoints: 2000,
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const signIn = (user: User) => setUser(user);
  const signOut = () => setUser(null);
  
  // Derive roles from user
  const isAdmin = user?.role === 'admin';
  const isHost = user?.role === 'host' || isAdmin;
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAdmin, isHost }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
} 