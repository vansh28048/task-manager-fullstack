import axios from "axios";
import { useEffect, useState } from "react";

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
        const res = await axios.get("http://localhost:4000/tasks/stats", {
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

  if (loading) return <p className="p-10">Loading dashboard...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-3xl font-bold">{stats.total}</h2>
        </div>

        <div className="bg-green-100 shadow rounded-lg p-6">
          <p className="text-green-700">Completed</p>
          <h2 className="text-3xl font-bold">{stats.completed}</h2>
        </div>

        <div className="bg-red-100 shadow rounded-lg p-6">
          <p className="text-red-700">Incomplete</p>
          <h2 className="text-3xl font-bold">{stats.incomplete}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;