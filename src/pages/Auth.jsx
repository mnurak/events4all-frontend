import React, { useEffect, useState } from "react";
import AuthForm from "./auth/AuthForm";

const Auth = () => {
  const [choise, setChoise] = useState("student");
  const change = (ch) => {
    setChoise(ch);
  };
  return (
    <>
      <div className="flex flex-row justify-end mx-9 p-1">
        <div
          className="w-35 h-10 bg-amber-500 mx-1 rounded-2xl text-center my-1 justify-center p-2"
          onClick={() => change("student")}
        >
          student
        </div>
        <div
          className="w-35 h-10 bg-amber-500 mx-1 rounded-2xl text-center my-1 justify-center p-2"
          onClick={() => change("college")}
        >
          college
        </div>
      </div>
      <AuthForm type={choise}></AuthForm>
    </>
  );
};

export default Auth;
