import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  // const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUserName(res.data.name || "");
          if (res.data.profileImage) {
            const imgPath = res.data.profileImage.startsWith("uploads/")
              ? res.data.profileImage
              : `uploads/${res.data.profileImage}`;
            setProfileImage(`http://localhost:4000/${imgPath}`);
          } else {
            setProfileImage("");
          }
        })
        .catch(() => {
          setUserName("");
          setProfileImage("");
        });
    }
  }, [isLoggedIn]);

  return (
    <header className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between sticky top-0 z-30">
      <Link
        to={isLoggedIn ? "/tasks" : "/"}
        className="flex items-center gap-2 text-xl font-bold text-blue-700"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#6366f1" />
          <path
            d="M8 12h8M12 8v8"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        TaskManager
      </Link>
      <nav className="flex items-center gap-6">
        <span className="text-gray-700 text-xs font-extralight mr-2 flex items-center gap-2">
          logged in as
          <span className="text-blue-700 text-lg font-bold ml-1 align-middle">
            {userName}
          </span>
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-blue-200 ml-2"
            />
          )}
        </span>
      </nav>
    </header>
  );
};

export default Header;
