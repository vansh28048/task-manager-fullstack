import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("vansh@gmail.com");
  const [password, setPassword] = useState("vansh@12");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.accessToken); 
      if (res.data.data.name) {
        localStorage.setItem("name", res.data.data.name);
      }
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-100 relative">
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ opacity: 0.08 }}
        >
          <defs>
            <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
          </defs>
          <circle cx="80%" cy="20%" r="180" fill="url(#bg-gradient)" />
          <circle cx="20%" cy="80%" r="120" fill="url(#bg-gradient)" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                fill="#6366f1"
                d="M12 2a7 7 0 0 0-7 7v2.18A3 3 0 0 0 3 14v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2a3 3 0 0 0-2-2.82V9a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5Zm-7 10a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm2 5a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1H6Z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">
            Sign in to your account
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>
        {error && (
          <div className="mb-4 w-full text-red-600 text-center bg-red-50 border border-red-200 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
            <span className="text-gray-400">||</span>
            <a href="/register" className="text-blue-600 hover:underline">
              Create account
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

