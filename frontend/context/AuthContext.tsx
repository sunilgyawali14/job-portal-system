"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * BACKEND REQUIREMENT — NOT YET ENFORCED HERE
 * Note: credentials: "include" sends cookies automatically, but it does NOT protect against CSRF attacks.
 * The backend MUST set the refresh-token cookie with SameSite=Strict or SameSite=Lax,
 * and should validate a CSRF token on state-changing requests (login, logout, refresh, etc.).
 */

let refreshPromise: Promise<string | null> | null = null;

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Helper function to fetch current user profile from GET /api/auth/me
   */
  const fetchCurrentUser = async (token: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      return data.data?.user || data.user || null;
    } catch (error) {
      console.error("Fetch current user failed:", error);
      return null;
    }
  };

  /**
   * Silently refresh the access token using
   * the HttpOnly refresh token cookie.
   * Deduplicates concurrent refresh requests using refreshPromise.
   */
  const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          setAccessToken(null);

          return null;
        }

        const data = await res.json();

        const newToken = data.data?.accessToken;

        if (!newToken) {
          setUser(null);
          setAccessToken(null);

          return null;
        }

        setAccessToken(newToken);

        return newToken;
      } catch (error) {
        console.error("Token refresh failed:", error);

        setUser(null);
        setAccessToken(null);

        return null;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  };

  /**
   * Restore authentication state when the application loads.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verify/refresh the session using the HttpOnly cookie.
        const token = await refreshAccessToken();

        if (!token) {
          setUser(null);
          setAccessToken(null);
          return;
        }

        const currentUser = await fetchCurrentUser(token);

        if (!currentUser) {
          setUser(null);
          setAccessToken(null);
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Auth initialization failed:", error);

        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Listen for cross-tab logout events.
   */
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "auth:logout") {
        setUser(null);
        setAccessToken(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const loginUser = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
  };

  const logoutUser = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.setItem("auth:logout", Date.now().toString());
    }
  };

  /**
   * Authenticated fetch wrapper that attaches Authorization token
   * and automatically retries once on 401 response status.
   */
  const authFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    let hasRetried = false;

    const makeRequest = async (token: string | null): Promise<Response> => {
      const headers = new Headers(init?.headers);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const requestInit: RequestInit = {
        ...init,
        headers,
        credentials: "include",
      };

      return await fetch(input, requestInit);
    };

    let response = await makeRequest(accessToken);

    if (response.status === 401 && !hasRetried) {
      hasRetried = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        response = await makeRequest(newToken);

        if (response.status === 401) {
          await logoutUser();
          throw new Error("Unauthorized: Session expired");
        }
      } else {
        await logoutUser();
        throw new Error("Unauthorized: Refresh failed");
      }
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        loginUser,
        logoutUser,
        refreshAccessToken,
        authFetch,
      }}
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
