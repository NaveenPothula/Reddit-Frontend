import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/auth"; // Assuming you have a logout action
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Assuming 'user' contains the logged-in user data

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/logout", {
        withCredentials: true,
      });
      if (response.data.status == "success") {
        dispatch(logout());
      }
    } catch (e) {
      alert(`logout fail ${e.response.data.message}`);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logout button on the left */}

      {/* Username on the right */}
      <div className="text-lg font-semibold">
        {user ? `Welcome, ${user}` : "Loading..."}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
