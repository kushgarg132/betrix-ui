import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold mb-8">Welcome to Betrix</h1>
      <Link
        to="/poker"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg text-2xl"
      >
        Play Poker
      </Link>
      <div className="mt-6 text-lg">
        <Link to="/login" className="underline mr-6">
          Login
        </Link>
        <Link to="/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
