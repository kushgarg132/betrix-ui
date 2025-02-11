import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";  // Axios instance

const HomePage = () => {
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await apiClient.get("/wallet/balance?username=sid123");
        setWallet(response.data);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get("/transactions/history?username=sid123");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchWallet();
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Betrix 🎲</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Wallet Balance: ₹{wallet}</h2>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Games</h2>
        <div className="grid grid-cols-3 gap-4">
          <GameCard title="Dice Game" description="Roll the dice and test your luck!" />
          <GameCard title="Card Game" description="Pick a card and win big!" />
          <GameCard title="Spin Wheel" description="Spin the wheel for exciting prizes!" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <ul className="bg-gray-100 p-4 rounded">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <li key={index} className="border-b py-2">
                {transaction.timestamp} - {transaction.type}: ₹{transaction.amount}  {transaction.description}
              </li>
            ))
          ) : (
            <p>No recent transactions</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const GameCard = ({ title, description }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition">
    <h3 className="text-lg font-bold">{title}</h3>
    <p>{description}</p>
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Play Now
    </button>
  </div>
);

export default HomePage;
