import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
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
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        setPreview(
          `http://localhost:4000/uploads/${res.data.profileImage}`
        );
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  fetchProfile();
}, []);

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
      await axios.put("http://localhost:4000/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            {/* <label className="block mb-2 font-semibold">Profile Picture</label> */}
            <div className="relative mt-4 w-34 h-34 mx-auto">
              <img
                src={preview || "https://ui-avatars.com/api/?name=" + form.name}
                alt="Preview"
                className="w-34 h-34 rounded-full object-cover border"
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
                className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md focus:outline-none"
                aria-label="Upload profile picture"
              >
                <FaCamera className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <div className="space-y-4 mt-8">
            <div>
              <label className="block mb-2 font-semibold">User ID</label>
              <input
                type="text"
                value={form._id}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Created At</label>
              <input
                type="text"
                value={
                  form.createdAt
                    ? new Date(form.createdAt).toLocaleString()
                    : ""
                }
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Updated At</label>
              <input
                type="text"
                value={
                  form.updatedAt
                    ? new Date(form.updatedAt).toLocaleString()
                    : ""
                }
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
