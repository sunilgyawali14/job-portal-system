"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  loginUser: (user: User, accessToken: string) => void;
  logoutUser: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        // Try to refresh the access token silently on page load
        refreshAccessToken();
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends refreshToken cookie
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user");
    }
  };

  /**
   * Silently refresh the access token using the HttpOnly refresh token cookie.
   * Returns the new access token or null if refresh failed.
   */
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends refreshToken cookie
      });

      if (!res.ok) {
        // Refresh failed — user needs to log in again
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        return null;
      }

      const data = await res.json();
      const newToken = data.data?.accessToken;
      if (newToken) {
        setAccessToken(newToken);
        return newToken;
      }
      return null;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, loginUser, logoutUser, refreshAccessToken }}
    >
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
