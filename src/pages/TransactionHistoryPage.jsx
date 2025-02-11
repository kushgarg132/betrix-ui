import React, { useState, useEffect } from "react";
import apiClient from "../api/api";

const formatDate = (localDateTime) => {
    const date = new Date(localDateTime); // Convert LocalDateTime to Date object
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  function TransactionHistoryPage({ username }) {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      apiClient
        .get(`/transactions/history`, { params: { username } })
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error("Error fetching transactions:", error));
    }, [username]);
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        {transactions.length > 0 ? (
          <ul className="space-y-2">
            {transactions.map((txn, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                <div>
                  <strong>Date:</strong> {new Date(txn.timestamp).toLocaleDateString()}
                </div>
                <div>
                  <strong>Amount:</strong> ${txn.amount}
                </div>
                <div>
                  <strong>Type:</strong> {txn.type}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    );
  }
  
  export default TransactionHistoryPage;
  
