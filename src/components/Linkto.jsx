import React from "react";
import { Link } from "react-router-dom";

const Linkto = (props) => {
  return (
    <Link to={props.link}>
    <button
      type="button"
      onClick={() => {
        if (props.onclick) props.onclick();
      }}
      className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md border border-white/25 hover:scale-105 hover:bg-gradient-to-r hover:from-teal-300 hover:to-indigo-600 hover:shadow-lg transition-transform duration-200 ease-in-out focus:outline-none"
      style={{ color: 'white' }} // ensure text color stays white even on hover
    >
      {props.text}
    </button>
  </Link>
  );
};

export default Linkto;
