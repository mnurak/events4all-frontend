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
        className="px-3 py-1 rounded-md hover:bg-white hover:text-red-600 transition-all duration-200"
      >
        {props.text}
      </button>
    </Link>
  );
};

export default Linkto;
