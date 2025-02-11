import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Betrix
      </div>
      <div>
        {username ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="hover:underline">
              Welcome, {username}
            </Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
