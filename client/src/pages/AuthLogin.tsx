import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // useAuth() gives us the login function from context
  // instead of manually doing localStorage.setItem everywhere
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // BEFORE (without context):
      //   localStorage.setItem("token", res.data.accessToken);
      //   localStorage.setItem("name", res.data.data.name);
      //
      // AFTER (with context):
      //   One call updates localStorage + state + triggers profile fetch
      login(res.data.accessToken, res.data.data.name || "");

      toast.success("Login successful!");
      navigate("/tasks");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-sm">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                d="M8 12h8M12 8v8"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to continue to TaskManager
          </p>
        </div>
        {error && (
          <div className="mb-4 w-full text-red-600 text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition text-base mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
