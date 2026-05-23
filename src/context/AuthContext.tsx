"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/utils/api";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load auth details from localStorage on mount
    const storedUser = localStorage.getItem("ely_user");
    const storedToken = localStorage.getItem("ely_token");
    Promise.resolve().then(() => {
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiFetch<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("ely_user", JSON.stringify(res.user));
    localStorage.setItem("ely_token", res.token);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await apiFetch<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("ely_user", JSON.stringify(res.user));
    localStorage.setItem("ely_token", res.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ely_user");
    localStorage.removeItem("ely_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
