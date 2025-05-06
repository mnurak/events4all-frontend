import React, { useContext, useEffect, useState } from "react";
// import EventContext from "../context/events/EventContext";
// import Alert from "../components/Alert";
// import { useNavigate } from "react-router-dom";
// import RegisterContext from "../context/register/RegisterContext";
import GetStudent from "./getRegistered/GetStudent";
import AuthContext from "../context/auth/AuthContext";
import GetCollege from "./getRegistered/GetCollege";


const Registered = () => {
  const {user} = useContext(AuthContext)

  return (<>
    {user==='student'? <GetStudent /> : <GetCollege />}
  </>
  )
  };

export default Registered;
