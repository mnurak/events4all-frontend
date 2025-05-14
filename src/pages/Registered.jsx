import React, { useContext, useEffect, useState } from "react";
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
