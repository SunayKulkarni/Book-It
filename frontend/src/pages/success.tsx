import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import MainLogo from "../icons/mainLogo";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract refId safely from navigation state
  const refId = state?.refId;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-8 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <MainLogo />
            <h1 className="text-xl font-semibold">BookIt</h1>
          </div>

          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              className="px-4 py-2 w-72 focus:outline-none"
              placeholder=""
            />
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 font-medium hover:opacity-90">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Booking Confirmed
        </h1>
        <p className="text-gray-600 mb-8">
          Ref ID: <span className="font-mono text-gray-800">{refId}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
