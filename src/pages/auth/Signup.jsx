import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import Alert from "../../components/Alert";

const Signup = (props) => {
  const { changeAuth, changeUser, BACKEND_LINK } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultCredential = {
    name: "",
    email: "",
    password: "",
    college: "",
    phoneNumber: "",
    address: "",
  };
  const [credential, setCredential] = useState(defaultCredential);
  const [desabled, setDesabled] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email);
    const isValidPassword = credential.password.length > 7;
    const isValidName = credential.name.length > 2;
    const others = () => {
      if (props.type === "student") return credential.college.length > 2;
      return (
        credential.phoneNumber.length === 10 && credential.address.length > 4
      );
    };
    setDesabled(!(isValidEmail && isValidPassword && isValidName && others()));
  }, [credential]);

  useEffect(() => setCredential(defaultCredential), [props]);

  const showTempAlert = (type, phone) => {
    if (type === "email") {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1500);
    } else if (type === "password") {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1500);
    } else if (type === 'phone'){
      setPhoneError(true)
      setTimeout(()=> setPhoneError(false), 1500)
    }
  };

  const update = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredential({ ...credential, [e.target.name]: e.target.value });
    if (
      name === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      showTempAlert("email");
    } else if (name === "password" && value.length > 0 && value.length <= 7) {
      showTempAlert("password");
    } else if (name === "phoneNumber" && !/^\d{10}$/.test(value))
      showTempAlert('phone')
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
          {emailError && (
            <Alert
              className="mt-1 rounded px-2 py-1 text-sm font-medium"
              message="Enter proper email"
              success={false}
            />
          )}
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
          {passwordError && (
            <Alert
              className="mt-1 rounded px-2 py-1 text-sm font-medium"
              message="Password must be at least 8 characters."
              success={false}
            />
          )}
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
            {phoneError && (
            <Alert
              className="mt-1 rounded px-2 py-1 text-sm font-medium"
              message="Phone number must have 10 digit numbers"
              success={false}
            />
          )}
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
