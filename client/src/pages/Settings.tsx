import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  // useAuth gives us the token and fetchProfile to refresh context after update
  const { token, fetchProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    profilePic: null as File | null,
    _id: "",
    createdAt: "",
    updatedAt: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files && files[0]) {
      setForm((prev) => ({ ...prev, profilePic: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          profilePic: null,
          _id: res.data._id || "",
          createdAt: res.data.createdAt || "",
          updatedAt: res.data.updatedAt || "",
        });

        if (res.data.profileImage) {
          setPreview(`${API_URL}/uploads/${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (form.profilePic) {
        formData.append("profileImage", form.profilePic);
      }
      await axios.put(`${API_URL}/user/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");

      // Re-fetch the profile in context so Header updates instantly
      await fetchProfile();
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
      <p className="text-gray-500 mb-8">Manage your profile information</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(form.name || "User") +
                    "&background=dbeafe&color=2563eb"
                }
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
              />
              <input
                id="profilePicInput"
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("profilePicInput")?.click()
                }
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition"
                aria-label="Upload profile picture"
              >
                <FaCamera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition shadow-sm cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Account Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">User ID</p>
              <p className="text-gray-700 font-mono text-xs bg-gray-50 rounded-lg px-3 py-2 truncate">
                {form._id}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Created</p>
              <p className="text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                {form.createdAt
                  ? new Date(form.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Last Updated</p>
              <p className="text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                {form.updatedAt
                  ? new Date(form.updatedAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
