import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ApiError,
  AuthContextType,
  LoginFormData,
  RegisterFormData,
  User,
} from "../interfaces/auth";

const AuthContext = createContext<AuthContextType>({
  user: null,
  error: "",
  loading: false,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Ensure loading starts as `true`
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
        return;
      }
      const response = await axios.get("https://backend-collaborative-project-management.onrender.com/user/check-auth", {
        headers: { Authorization: `${accessToken}` },
      });
      if (response) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      if (err.response?.data?.shouldReLogin) {
        logout();
      }
    } finally {
      setLoading(false); // Stop loading after check completes
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "https://backend-collaborative-project-management.onrender.com/user/signup",
        data
      );
      if (response.data) {
        setUser(response.data.user);
        navigate("/login");
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "https://backend-collaborative-project-management.onrender.com/user/signin",
        data
      );
      if (response) {
        localStorage.setItem("accessToken", response.data.acessToken);
        setUser(response.data.user);
        navigate("/dashboard");

      }
    } catch (error: unknown) {
      const err = error as ApiError;
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      const response = await axios.get("http://localhost:4000/auth/log-out", {
        headers: { Authorization: `${accessToken}` },
      });
      if (response.data.success) {
        setUser(null);
        navigate("/login");
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Show loading state to prevent rendering children before auth check completes
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, error, loading, signUp, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
