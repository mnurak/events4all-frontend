import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import Linkto from "./Linkto";

const Navbar = () => {
  const { authenticated, user, changeAuth, changeUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("auth-token");
    changeUser("student");
    changeAuth(false);
    navigate("/auth");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 shadow-lg">
      <div className="text-white text-xl font-semibold cursor-pointer">
        EventSphere
      </div>

      {/* Desktop and Mobile View */}
      <div className="hidden md:flex space-x-6 items-center text-white font-medium">
        <Linkto link="/" text="Home" />
        <Linkto link="/events" text="Events" />
        <Linkto link="/event/register" text="Register" />
        {authenticated && (
          <Linkto
            link="/registered"
            text={user === "college" ? "Created" : "Registered"}
          />
        )}
        <Linkto link="/about" text="About" />
        {!authenticated ? (
          <Linkto link="/auth" text="Signup/Login" />
        ) : (
          <Linkto onclick={logout} link="#" text="Logout" />
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-indigo-600 shadow-lg mt-12 flex flex-col items-center space-y-4 py-4">
          <Linkto link="/" text="Home" />
          <Linkto link="/events" text="Events" />
          <Linkto link="/event/register" text="Register" />
          {authenticated && (
            <Linkto
              link="/registered"
              text={user === "college" ? "Created" : "Registered"}
            />
          )}
          <Linkto link="/about" text="About" />
          {!authenticated ? (
            <Linkto link="/auth" text="Signup/Login" />
          ) : (
            <Linkto onclick={logout} link="#" text="Logout" />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
