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
      >
        {props.text}
      </button>
    </Link>
  );
};

export default Linkto;
