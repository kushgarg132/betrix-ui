import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DiceGame from "./pages/DiceGame";
import CardGame from "./pages/CardGame";
import SpinWheel from "./pages/SpinWheel";
import ProfilePage from "./pages/ProfilePage";
import TransactionsPage from "./pages/TransactionsPage";
import PokerTable from "./pages/PokerTable";
import LandingPage from "./pages/LandingPage";
function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/poker" element={<PokerTable />} />
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
