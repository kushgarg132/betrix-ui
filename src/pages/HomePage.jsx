import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";

const HomePage = () => {
  const [wallet, setWallet] = useState(0);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchWallet = async () => {
      if (username) {
        try {
          const response = await apiClient.get(`/wallet/balance?username=${username}`);
          setWallet(response.data);
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
        }
      } else {
        navigate("/login");  // Redirect to login if no username is found
      }
    };

    fetchWallet();
  }, [username, navigate]);

  const handleGameNavigation = (gamePath) => {
    navigate(gamePath);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Betrix 🎲</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Wallet Balance: ₹{wallet}</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <GameCard title="Dice Game" onClick={() => handleGameNavigation("/games/dice")} />
        <GameCard title="Card Game" onClick={() => handleGameNavigation("/games/card")} />
        <GameCard title="Spin Wheel" onClick={() => handleGameNavigation("/games/spin")} />
      </div>
    </div>
  );
};

const GameCard = ({ title, onClick }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition">
    <h3 className="text-lg font-bold">{title}</h3>
    <button onClick={onClick} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Play Now
    </button>
  </div>
);

export default HomePage;
