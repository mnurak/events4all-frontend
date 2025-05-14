import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import StudentRegister from "./register/StudentRegister";
import CollegeRegister from "./register/CollegeRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, authenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    if (!authenticated) {
      alert("You must first login to register");
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [loading]);

  if (loading)
    return (
      <div className="text-center text-lg text-gray-600 mt-10">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {user === "student" ? <StudentRegister /> : <CollegeRegister />}
      </div>
    </div>
  );
};

export default Register;
