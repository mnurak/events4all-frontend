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
        {["student", "college"].map((type) => (
          <button
            key={type}
            onClick={() => change(type)}
            className={`px-6 py-2 text-indigo-150 rounded-full font-semibold shadow-md transition-all duration-200 transform
        ${
          choise === type
            ? "bg-amber-600 scale-105 ring-2 ring-indigo-950"
            : "bg-amber-300  hover:bg-amber-400 hover:scale-105"
        }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <AuthForm type={choise}></AuthForm>
    </>
  );
};

export default Auth;
