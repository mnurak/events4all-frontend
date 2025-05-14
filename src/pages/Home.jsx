import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center px-4 py-20 flex-1"
      >
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          Welcome to CampusEvents
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Register and manage campus events effortlessly. Whether you’re a
          college hosting an event or a student looking to join — we’ve made it
          easy for you.
        </p>

        <div className="flex gap-4 flex-col md:flex-row">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/event/register")}
          >
            Register Event (College)
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => navigate("/auth")}
          >
            Login / Register (Student)
          </button>
        </div>
      </motion.main>

      {/* Optional Footer */}
      <footer className="bg-white shadow-inner text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} CampusEvents. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
