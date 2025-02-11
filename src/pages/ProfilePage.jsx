import React, { useEffect, useState } from "react";
import apiClient from "../api/api";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userBalance, setUserBalance] = useState({});
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/users/profile?username=${username}`);
        console.log("User Info:", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchUserBalance = async () => {
      try {
        const response = await apiClient.get(`/wallet/balance?username=${username}`);
        console.log("User Balance:", response.data);
        setUserBalance(response);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserInfo();
    fetchUserBalance();
  }, [username]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Username</h2>
          <p className="text-gray-700">{userInfo.username || "N/A"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-700">{userInfo.email || "N/A"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Wallet Balance</h2>
          <p className="text-gray-700">₹{userBalance.data || 0}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Registration Date</h2>
          <p className="text-gray-700">{userInfo.registrationDate || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
