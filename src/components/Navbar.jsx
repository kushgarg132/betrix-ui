import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../api/api";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [wallet, setWallet] = useState(0);
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchWallet = async () => {
      if (username) {
        try {
          const response = await apiClient.get(`/wallet/balance?username=${username}`);
          setWallet(response.data);
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
        }
      }
    };

    fetchWallet();
  }, [username]);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left: Back Button */}
      <div>
        {location.pathname !== "/" && ( // Show Back button only if not on the Home page
          <button
            onClick={handleBack}
            className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        )}
      </div>

      {/* Center: Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer text-center absolute w-full left-0 right-0"
        onClick={() => navigate("/")}
      >
        Betrix
      </h1>

      {/* Right: User Info Dropdown */}
      <div className="relative flex items-center space-x-4 ml-auto">
        <button
          className="flex items-center space-x-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="font-semibold">{username}</span>
          <span>₹{wallet}</span>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
            <ul className="p-2">
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </li>
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/transactions")}
              >
                Transactions
              </li>
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
