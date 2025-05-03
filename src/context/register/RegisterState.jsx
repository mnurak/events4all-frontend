import React, { useContext, useEffect, useState } from "react";
import RegisterContext from "./RegisterContext";
import AuthContext from "../auth/AuthContext";

const RegisterState = (props) => {
  const { user } = useContext(AuthContext);
  const [fetched, setfetched] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  const getRegistrations = async () => {
    try {
      const responce = await fetch(
        `http://localhost:5001/api/registration/${user}/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const json = await responce.json();
      if (json.success) setRegistrations(json.regs);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  useEffect(() => {
    setfetched(true);
  }, [registrations]);

  return (
    <RegisterContext.Provider
      value={{ registrations, getRegistrations, fetched }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
