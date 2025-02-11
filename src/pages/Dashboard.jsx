import React from "react";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";  // Force full reload to clear session
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
