import React, { useContext, useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Alert from "../../components/Alert";
import AuthContext from "../../context/auth/AuthContext";

const AuthForm = (props) => {
  
  const [display, setdisplay] = useState(false);
  const [type, settype] = useState("");
  const [Message, setMessage] = useState("");
  

  const show = (par) => {
    const { success, message } = par;
    settype(success ? "success" : "danger");
    setMessage(message);
    setdisplay(true);
    setTimeout(() => {
      setdisplay(false);
    }, 1500);
  };
  return (
    <div className="flex flex-col items-center mt-6 w-full">
      {display && (
        <div className="w-[80%] sm:w-[60%] md:w-[40%] mb-4">
          <Alert alert={type} message={Message} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] max-w-6xl mt-6">
        <Signup show={show} type={props.type} />
        <Login show={show} type={props.type} />
      </div>
    </div>
  );
};

export default AuthForm;
