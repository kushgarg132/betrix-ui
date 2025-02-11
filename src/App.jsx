import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DiceGame from "./pages/DiceGame";
import CardGame from "./pages/CardGame";
import SpinWheel from "./pages/SpinWheel";
import ProfilePage from "./pages/ProfilePage";
import TransactionsPage from "./pages/TransactionsPage";
function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/games/dice" element={<DiceGame />} />
        <Route path="/games/card" element={<CardGame />} />
        <Route path="/games/spin" element={<SpinWheel />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
