import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("student");

  const changeAuth = (c) => {
    if (c === false) {
      setAuthenticated(false);
      localStorage.removeItem("auth-token");
    } else {
      setAuthenticated(true);
      localStorage.setItem("auth-token", c);
    }
  };
  const changeUser = (c) => {
    localStorage.setItem("user", c);
    setUser(c);
  };
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setAuthenticated(true);
    }
    if (localStorage.getItem("user")) setUser(localStorage.getItem("user"));
    // console.log(user)
  }, []);
  return (
    <AuthContext.Provider
      value={{ authenticated, user, changeAuth, changeUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
