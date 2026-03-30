import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  // BEFORE: const isLoggedIn = Boolean(localStorage.getItem("token"));
  // AFTER:  reads from context
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex flex-col">
      <header className="flex flex-col items-center justify-center py-28 px-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              d="M8 12h8M12 8v8"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          TaskManager
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-lg text-center leading-relaxed">
          A modern task management platform built with React, Node.js, Express,
          and MongoDB. Stay organized, track progress, and get things done.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 text-white text-base font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate(isLoggedIn ? "/tasks" : "/login")}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-700 text-base font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Explore
          </button>
        </div>
      </header>

      <section className="flex flex-col items-center py-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Why TaskManager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Simple & Intuitive</h3>
            <p className="text-gray-500 text-sm">Create, update, and track tasks effortlessly with a clean, modern interface.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Progress</h3>
            <p className="text-gray-500 text-sm">Dashboard with real-time stats and completion rates to keep you on track.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Reliable</h3>
            <p className="text-gray-500 text-sm">JWT authentication with encrypted passwords keeps your data safe and private.</p>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-6 text-center text-gray-400 text-sm border-t border-gray-100">
        &copy; {new Date().getFullYear()} TaskManager. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
