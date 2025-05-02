import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import StudentRegister from "./register/StudentRegister";
import CollegeRegister from "./register/CollegeRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    if (!authenticated) {
      alert("You must first login to register");
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [authenticated]);

  return <>{user === "student" ? <StudentRegister /> : <CollegeRegister />}</>;
};

export default Register;
