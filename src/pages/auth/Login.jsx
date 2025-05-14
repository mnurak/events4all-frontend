import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {
  const { changeAuth, changeUser, BACKEND_LINK } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultCredential = {
    password: "",
    email: "",
  };
  const [credential, setCredential] = useState(defaultCredential);
  const update = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  useEffect(() => setCredential(defaultCredential), [props]);

  const login = async () => {
    try {
      const response = await fetch(
        `${BACKEND_LINK}api/auth/${props.type}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );

      const json = await response.json().catch(() => ({})); // prevent crash on bad JSON

      if (response.ok && json.success) {
        changeAuth(json.authToken);
        changeUser(props.type);
        props.show({ success: true, message: "Successfully logged in" });
        setTimeout(() => {
          navigate(props.type === "college" ? "/registered" : "/");
        }, 1500);
      } else {
        props.show({
          success: false,
          message: json.error || "Something went wrong. Try again later.",
        });
      }
    } catch (error) {
      props.show({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  };

  return (
    <>
      <div className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="mb-4">
          <label
            htmlFor="loginemail"
            className="block text-gray-700 text-sm font-medium"
          >
            Email Address
          </label>
          <input
            type="email"
            id="loginemail"
            name="email"
            value={credential.email}
            onChange={(e) => update(e)}
            placeholder="Enter email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="loginpassword"
            className="block text-gray-700 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="loginpassword"
            name="password"
            value={credential.password}
            onChange={(e) => update(e)}
            placeholder="Enter password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="mt-6">
          <button
            className="w-full py-3 text-white font-semibold rounded-xl"
            onClick={login}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
