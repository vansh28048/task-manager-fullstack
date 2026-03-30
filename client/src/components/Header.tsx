import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

const Header: React.FC = () => {
  // BEFORE (without context):
  //   const isLoggedIn = Boolean(localStorage.getItem("token"));
  //   const [userName, setUserName] = useState("");
  //   useEffect(() => { axios.get("/user/profile")... }, []);
  //
  // AFTER (with context):
  //   One line — user data is already fetched and shared via context
  const { isLoggedIn, user } = useAuth();

  const profileImageUrl = user?.profileImage
    ? `${API_URL}/uploads/${user.profileImage}`
    : "";

  return (
    <header className="w-full bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between sticky top-0 z-30">
      <Link
        to={isLoggedIn ? "/tasks" : "/"}
        className="flex items-center gap-2.5 text-xl font-bold text-gray-800 hover:text-blue-600 transition"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M8 12h8M12 8v8"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        TaskManager
      </Link>
      <div className="flex items-center gap-3">
        {user?.name && (
          <span className="text-sm text-gray-500">
            Hello, <span className="font-semibold text-gray-800">{user.name}</span>
          </span>
        )}
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-gray-100"
          />
        ) : user?.name ? (
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
            {user.name.charAt(0).toUpperCase()}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
