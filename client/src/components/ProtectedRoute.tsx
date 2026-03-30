import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  // BEFORE: const isLoggedIn = Boolean(localStorage.getItem("token"));
  // AFTER:  reads from context — stays in sync with login/logout
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
