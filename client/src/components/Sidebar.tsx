import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiSettings } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
//  FiUsers,

import { toast } from "react-toastify";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const menuItems: SidebarItem[] = [
  {
    label: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: <FaTasks />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  // const userName = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <aside className="w-64 h-full sticky top-20 bg-white text-blue-900 flex flex-col rounded-2xl shadow-lg">
      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold text-blue-950
               ${isActive ? "bg-blue-100  shadow" : ""}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm cursor-pointer"
          >
            Logout
          </button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
