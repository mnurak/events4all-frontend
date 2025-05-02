import React, { useContext, useEffect, useState } from "react";
import Linkto from "./Linkto";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Navbar = () => {
  const { authenticated, changeAuth, changeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    console.log("logging out")
    localStorage.removeItem("auth-token");
    changeUser("student");
    changeAuth(false);
    navigate("/auth");
  };

  return (
    <div className="flex justify-end space-x-2 px-2 py-1 bg-red-500">
      <Linkto link="/" text="Home" />
      <Linkto link="/events" text="Events" />
      <Linkto link="/event/register" text="register" />
      <Linkto link="/about" text="About" />
      {!authenticated ? (
        <Linkto link="/auth" text="Signup/Login" />
      ) : (
        <Linkto onclick={logout} link="/auth" text="logout" />
      )}
    </div>
  );
};

export default Navbar;
