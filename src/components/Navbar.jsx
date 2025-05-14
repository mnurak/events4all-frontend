import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import Linkto from "./Linkto";

const Navbar = () => {
  const { authenticated, user, changeAuth, changeUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");
    changeUser("student");
    changeAuth(false);
    navigate("/auth");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 shadow-lg">
      <div className="text-white text-xl font-semibold">EventSphere</div>
      <div className="flex space-x-4 text-white font-medium">
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
    </nav>
  );
};

export default Navbar;
