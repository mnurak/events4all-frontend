import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Signup = (props) => {
  const { changeAuth, changeUser, BACKEND_LINK } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultCredential = {
    name: "",
    email: "",
    password: "",
    college: "",
    phoneNumber: "",
    address:''
  };
  const [credential, setCredential] = useState(defaultCredential);
  const [desabled, setDesabled] = useState(true);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email);
    const isValidPassword = credential.password.length > 7;
    const isValidName = credential.name.length > 2
    const others = () => {
      if(props.type === 'student')
        return credential.college.length > 2
      return credential.phoneNumber.length === 10 && credential.address.length > 4
    }
    setDesabled(!(isValidEmail && isValidPassword && isValidName && others()));
  }, [credential]);

  useEffect(() => setCredential(defaultCredential), [props]);

  const update = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (desabled) return;
    try {
      const response = await fetch(
        `${BACKEND_LINK}api/auth/${props.type}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );

      const json = await response.json().catch(() => ({}));

      if (response.ok && json.success) {
        changeAuth(json.authToken);
        changeUser(props.type);
        props.show({ success: true, message: "successfuly signed up" });
        setTimeout(() => {
          navigate(props.type == "college" ? "/registered" : "/");
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
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={credential.name}
            onChange={(e) => update(e)}
            placeholder="Enter name"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credential.email}
            onChange={(e) => update(e)}
            placeholder="Enter email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credential.password}
            onChange={(e) => update(e)}
            placeholder="Enter password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
        {props.type === "college" ? (
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-medium"
            >
              phone
            </label>
            <input
              type="phone"
              id="phone"
              onChange={(e) => update(e)}
              placeholder="Enter phone number"
              value={credential.phoneNumber}
              name="phoneNumber"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label
              htmlFor="college"
              className="block text-gray-700 text-sm font-medium"
            >
              college
            </label>
            <input
              type="college"
              id="college"
              onChange={(e) => update(e)}
              placeholder="Enter college name"
              value={credential.college}
              name="college"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        )}
        {props.type === "college" && (
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-medium"
            >
              address
            </label>
            <textarea
              id="address"
              onChange={(e) => update(e)}
              placeholder="Enter address"
              value={credential.address}
              name="address"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        )}
        <div className="mt-6">
          <button
            className={`w-full py-3 font-semibold rounded-xl ${
              desabled
                ? "bg-gray-400 cursor-not-allowed text-gray-200 transition-none"
                : "bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
            }`}
            onClick={signup}
            disabled={desabled}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
