import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Alert from "../../components/Alert";

const AuthForm = (props) => {
  const [display, setdisplay] = useState(false);
  const [type, settype] = useState('');
  const [Message, setMessage] = useState('');

  const show = (par) => {
    const {success, message} = par
    settype(success?'success':'danger')
    setMessage(message)
    setdisplay(true);
    setTimeout(() => {
      setdisplay(false);
    }, 1500);
  };
  return (
    <div className="grid grid-rows-2">
      <div
        className={`h-15 w-[50%] justify-self-center ${
          display ? "block" : "hidden"
        }`}
      >
        <Alert alert={type} message={Message} />
      </div>
      <div className="grid grid-cols-2 gap-20 mx-25 mt-10 h-20 p-2">
        <div className="p-4 border bg-gray-200">
          <Signup show={show} type={props.type} />
        </div>
        <div className="p-4 border bg-gray-200">
          <Login show={show} type={props.type} />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
