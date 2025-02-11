import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Betrix 🎲</h1>
      <p className="text-lg mb-8">The ultimate platform to test your luck and skills!</p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
