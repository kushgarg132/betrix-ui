import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";  // Axios instance

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", { username, password });
      
      // Save token to localStorage
      localStorage.setItem("authToken", response.data.token);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default LoginPage;
