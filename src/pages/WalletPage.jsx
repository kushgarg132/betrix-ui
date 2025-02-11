import React, { useState, useEffect } from "react";
import apiClient from "../api/api";

function WalletPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    apiClient.get("/wallet")
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching wallet balance:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <p>Your current balance: ₹{balance}</p>
    </div>
  );
}

export default WalletPage;
