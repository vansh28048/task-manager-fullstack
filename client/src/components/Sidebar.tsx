import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiSettings } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const menuItems: SidebarItem[] = [
  { label: "Home", path: "/", icon: <FiHome /> },
  { label: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
  { label: "Tasks", path: "/tasks", icon: <FaTasks /> },
  { label: "Settings", path: "/settings", icon: <FiSettings /> },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // BEFORE: const isLoggedIn = Boolean(localStorage.getItem("token"));
  // AFTER:  pulled from context — single source of truth
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // BEFORE: manually clearing localStorage + navigating
    // AFTER:  logout() clears token + user state in one call
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <aside className="w-60 min-h-[calc(100vh-56px)] bg-white border-r border-gray-100 flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium
               ${
                 isActive
                   ? "bg-blue-50 text-blue-600"
                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
               }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {isLoggedIn && (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
