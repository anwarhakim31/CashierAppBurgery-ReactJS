import React from "react";

const Label = ({ name, children }) => {
  return (
    <label
      htmlFor={name}
      className="block font-semibold text-slate-900 text-lg mb-1"
    >
      {children}
    </label>
  );
};

export default Label;
