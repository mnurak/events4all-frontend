import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Signup = (props) => {
  const { changeAuth, changeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultCredential = {
    name: "",
    email: "",
    password: "",
    college: "",
    phoneNumber: "",
  };
  const [credential, setCredential] = useState(defaultCredential);
  const update = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  useEffect(() => setCredential(defaultCredential), [props]);

  const signup = async () => {
    const response = await fetch(
      `http://localhost:5001/api/auth/${props.type}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      }
    );

    const json = await response.json();
    if (json.success) {
      changeAuth(json.authToken);
      changeUser(props.type);
      props.show({ success: true, message: "successfuly signed up" });
      setTimeout(() => {
        navigate(props.type == "college" ? "/registered" : "/");
      }, 1500);
    } else {
      props.show({ success: false, message: json.error });
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
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
            className="w-full py-3 px-4 text-white font-semibold rounded-lg  focus:outline-none focus:ring-2 "
            onClick={signup}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
