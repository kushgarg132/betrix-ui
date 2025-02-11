import { useState } from "react";
import apiClient from "../api/api";

export default function DiceGamePage() {
  const [betAmount, setBetAmount] = useState("");
  const [betNumber, setBetNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const username = sessionStorage.getItem("username");
  const handlePlayDice = async () => {
    if (!betAmount || !betNumber || betNumber < 1 || betNumber > 6) {
      alert("Please enter a valid bet amount and choose a number between 1 and 6.");
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
      const response = await clientApi.post(`games/dice/play?username=${username}&betAmount=${parseFloat(betAmount)}&betNumber=${parseInt(betNumber)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    
      if (!response.ok) {
        throw new Error("Request failed");
      }
    
      const data = await response.json();
      console.log(data);
      setResult(data.outcome || "Something went wrong. Please try again.");
    } catch (error) {
      setResult("Error: Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🎲 Dice Game</h1>
      <p className="mb-4">Pick a number between 1 and 6 and place your bet!</p>
      
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Enter bet amount"
          className="w-64 p-2 rounded bg-gray-700 text-white"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pick a number (1-6)"
          className="w-64 p-2 rounded bg-gray-700 text-white"
          value={betNumber}
          onChange={(e) => setBetNumber(e.target.value)}
        />
        <button
          onClick={handlePlayDice}
          className="bg-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-600"
          disabled={loading}
        >
          {loading ? "Rolling..." : "Roll the Dice"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  );
}
