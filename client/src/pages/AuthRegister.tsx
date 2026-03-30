import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/api";

const AuthRegister: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      await axios.post(`${API_URL}/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Registration successful! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      setPreview(null);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
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
            Create your account
          </h2>
          <p className="text-gray-500 text-sm">
            Sign up to get started with TaskManager
          </p>
        </div>
        {error && (
          <div className="mb-4 w-full text-red-600 text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 w-full text-green-700 text-center bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
            {success}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(name || "User") +
                    "&background=dbeafe&color=2563eb"
                }
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
              />
              <input
                id="registerProfilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("registerProfilePic")?.click()
                }
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow-md transition"
                aria-label="Upload profile picture"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              placeholder="Your name"
            />
          </div>
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
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
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
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;
