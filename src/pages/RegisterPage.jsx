import React, { useState } from "react";
import apiClient from "../api/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/register", { username, password });
      setMessage(response.data); // Show success message
    } catch (error) {
      setMessage("Registration failed. Username might already exist.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default RegisterPage;
