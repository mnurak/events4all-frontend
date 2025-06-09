import React from "react";

const Input = (parms) => {
  return (
    <div className="my-4 p-2">
      <label
        htmlFor={parms.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {parms.message}
      </label>
      <input
        type={parms.type || "text"}
        name={parms.name}
        id={parms.name}
        value={parms.value}
        onChange={parms.update}
        placeholder={parms.placeholder}
        min={parms.min}
        max={parms.max}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
      />
      {parms.description && (
        <p className="text-sm text-orange-400 mb-2 mt-1.5">
          {parms.description}
        </p>
      )}
    </div>
  );
};

export default Input;
