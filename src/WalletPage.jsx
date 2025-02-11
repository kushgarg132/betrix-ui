import { useState, useEffect } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/wallet/balance?username=kushgarg")
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Your Wallet</h1>
      <p className="text-lg mb-8">Balance: ₹{balance}</p>
      <div className="flex space-x-4">
        <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600">Deposit</button>
        <button className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600">Withdraw</button>
      </div>
    </div>
  );
}
