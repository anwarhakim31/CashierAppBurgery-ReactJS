import React from "react";

const Button = ({ children }) => {
  return (
    <button className="w-full mt-5 xs:mt-6 p-2 xs:p-3 text-center text-white bg-slate-900 rounded-lg ">
      {children}
    </button>
  );
};

export default Button;
