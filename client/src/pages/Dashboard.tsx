import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    incomplete: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (loading)
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your task progress</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
          </div>
          <h2 className="text-4xl font-bold text-gray-800">{stats.total}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
          </div>
          <h2 className="text-4xl font-bold text-green-600">{stats.completed}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Incomplete</p>
          </div>
          <h2 className="text-4xl font-bold text-amber-600">{stats.incomplete}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <span className="text-2xl font-bold text-gray-800">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500 bg-linear-to-r from-blue-500 to-green-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {stats.completed} of {stats.total} tasks completed
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
