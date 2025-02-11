import React, { useState, useEffect } from "react";
import apiClient from "../api/api";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5; // Number of transactions per page
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get(`transactions/history?username=${username}`);
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [username]);

  // Filter transactions based on type and date range
  const filterTransactions = () => {
    let filtered = transactions;

    if (transactionType !== "ALL") {
      filtered = filtered.filter((txn) => txn.type === transactionType);
    }

    if (startDate) {
      filtered = filtered.filter((txn) => new Date(txn.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((txn) => new Date(txn.date) <= new Date(endDate));
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Transaction History</h1>

      {/* Filters Section */}
      <div className="flex space-x-4 mb-6">
        <select
          className="border p-2 rounded"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={filterTransactions}
        >
          Apply Filters
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border-b">{new Date(transaction.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">₹{transaction.amount}</td>
                  <td className="px-4 py-2 border-b">{transaction.type}</td>
                  <td className="px-4 py-2 border-b">{transaction.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border-b text-center" colSpan="4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsPage;
