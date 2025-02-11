import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/dice-game" className="mr-4">Dice Game</Link>
        <Link to="/wallet" className="mr-4">Wallet</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
    </header>
  );
}

export default Header;
