import React from "react";

const Input = (parms) => {
  return (
    <div className="my-1 p-2 ">
      <label htmlFor={parms.name}>{parms.message}</label>
      <input
        type={parms.type || "text"}
        name={parms.name}
        id={parms.name}
        value={parms.value}
        onChange={parms.update}
        placeholder={parms.placeholder}
        min={parms.min}
        max={parms.max} 
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );
};

export default Input;
