import React, { useContext, useEffect, useState } from "react";
import RegisterContext from "./RegisterContext";
import AuthContext from "../auth/AuthContext";
import EventContext from "../events/EventContext";

const RegisterState = (props) => {
  const { user } = useContext(AuthContext);
  const {fetched} = useContext(EventContext)
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(()=>{
    if(fetched)
      setLoading(false)
  }, [fetched])


  return (
    <RegisterContext.Provider
      value={{ registrations, getRegistrations, loading }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
