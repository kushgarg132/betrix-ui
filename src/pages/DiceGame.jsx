import React, { useState } from "react";
import apiClient from "../api/api";

const DiceGame = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [betNumber, setBetNumber] = useState(1);
  const [result, setResult] = useState("");
  const username = sessionStorage.getItem("username");

  const playDiceGame = async () => {
    try {
      const response = await apiClient.post(
        `/games/dice/play?username=${username}&betAmount=${betAmount}&betNumber=${betNumber}`
      );
      console.log("Dice game result:", response.data);
      setResult(response.data); // Backend should return success/failure message
    } catch (error) {
      console.error("Error playing dice game:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Dice Game</h2>
      <label className="block mb-2">Bet Amount:</label>
      <input
        type="number"
        className="w-full p-2 mb-4 text-black"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
      />
      <label className="block mb-2">Choose a Number (1-6):</label>
      <input
        type="number"
        className="w-full p-2 mb-4 text-black"
        value={betNumber}
        min={1}
        max={6}
        onChange={(e) => setBetNumber(Number(e.target.value))}
      />
      <button
        onClick={playDiceGame}
        className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
      >
        Roll Dice
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
};

export default DiceGame;
