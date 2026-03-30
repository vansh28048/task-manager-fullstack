import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

// Step 1: Define the shape of our context
// This tells TypeScript (and us) what data and functions the context will hold
type AuthContextType = {
  token: string | null;
  user: { name: string; email: string; profileImage: string; _id: string } | null;
  isLoggedIn: boolean;
  login: (token: string, name: string) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
};

// Step 2: Create the context with a default value of null
// createContext creates a "container" that can pass data through the component
// tree without having to pass props manually at every level
const AuthContext = createContext<AuthContextType | null>(null);

// Step 3: Create the Provider component
// The Provider wraps your app and makes the context value available
// to all child components that call useContext(AuthContext)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This state lives HERE in the provider, not scattered across components
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  // Derived state — no need to check localStorage everywhere anymore
  const isLoggedIn = Boolean(token);

  // Fetch user profile from the API
  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        name: res.data.name || "",
        email: res.data.email || "",
        profileImage: res.data.profileImage || "",
        _id: res.data._id || "",
      });
    } catch {
      // Token might be expired/invalid — clear everything
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    }
  };

  // Called after successful login
  const login = (newToken: string, name: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("name", name);
    setToken(newToken);
    // Set basic user info immediately, full profile fetched by useEffect below
    setUser((prev) => (prev ? { ...prev, name } : { name, email: "", profileImage: "", _id: "" }));
  };

  // Called on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setUser(null);
  };

  // Auto-fetch profile when token changes (login, page refresh, etc.)
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  // Step 4: Pass the value to all children via the Provider
  // Any component inside <AuthProvider> can access these values
  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, login, logout, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Step 5: Custom hook — a clean way for components to consume the context
// Instead of writing useContext(AuthContext) everywhere, components just call useAuth()
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
};
