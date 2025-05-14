import React, { useEffect, useState } from "react";
import AuthForm from "./auth/AuthForm";

const Auth = () => {
  const [choise, setChoise] = useState("student");
  const change = (ch) => {
    setChoise(ch);
  };
  return (
    <>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => change("student")}
          className={`px-6 py-2 rounded-full font-semibold text-white shadow-md transition-all duration-200 ${
            choise === "student"
              ? "bg-amber-600"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => change("college")}
          className={`px-6 py-2 rounded-full font-semibold text-white shadow-md transition-all duration-200 ${
            choise === "college"
              ? "bg-amber-600"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          College
        </button>
      </div>

      <AuthForm type={choise}></AuthForm>
    </>
  );
};

export default Auth;
