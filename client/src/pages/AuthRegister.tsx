import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      await axios.post("http://localhost:4000/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Registration successful! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      setPreview(null);
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-100 relative">
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
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
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#6366f1" d="M12 2a7 7 0 0 0-7 7v2.18A3 3 0 0 0 3 14v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2a3 3 0 0 0-2-2.82V9a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5Zm-7 10a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm2 5a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1H6Z"/></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Create your account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started with our platform.</p>
        </div>
        {error && (
          <div className="mb-4 w-full text-red-600 text-center bg-red-50 border border-red-200 rounded px-3 py-2 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 w-full text-green-700 text-center bg-green-50 border border-green-200 rounded px-3 py-2 text-sm">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" encType="multipart/form-data">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Profile Preview"
                          className="mt-2 w-20 h-20 rounded-full object-cover border"
                        />
                      )}
                    </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <a href="/login" className="text-blue-600 hover:underline">Already have an account?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthRegister;
