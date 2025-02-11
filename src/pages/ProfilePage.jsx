import React, { useState, useEffect } from "react";
import apiClient from "../api/api";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/users/profile?username=${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [username]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="border p-4 rounded shadow">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Wallet Balance:</strong> ₹{user.balance}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
