// Modern SaaS-style Home page with hero, features, and call-to-action
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-24 px-4">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg">
          Node CRUD
        </h1>
        <p className="text-xl text-blue-900 mb-8 max-w-xl text-center">
          Supercharge your productivity with a modern, scalable task management
          platform built on Node.js, Express, PostgreSQL, and React.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Get Started --&gt;
        </button>
        <button
          onClick={() => {
            const isLoggedIn = Boolean(localStorage.getItem("token"));
            navigate(isLoggedIn ? "/tasks" : "/login");
          }}
          className="mt-4 px-8 py-3 bg-white border border-blue-600 text-blue-700 text-lg font-semibold rounded-full shadow hover:bg-blue-50 transition cursor-pointer"
        >
          Explore
        </button>
      </header>

      {/* Features Section */}
      <section className="flex flex-col items-center py-12 px-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2l4 -4" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Easy Task Management</h3>
            <p className="text-gray-600 text-center">
              Create, update, and track tasks effortlessly with a clean
              interface.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8v4l3 3" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600 text-center">
              Stay in sync with instant updates powered by modern backend tech.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Scalable & Secure</h3>
            <p className="text-gray-600 text-center">
              Built with best practices for performance, scalability, and
              security.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-blue-700 text-sm">
        &copy; {new Date().getFullYear()} Node CRUD SaaS. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
//onClick={() => {
//   const isLoggedIn = Boolean(localStorage.getItem("token"));
//   navigate(isLoggedIn ? "/tasks" : "/login");
// }}
