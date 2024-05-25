import React from "react";

const Input = (props) => {
  const { type, placeholder, name, handleOnChange, value, ref } = props;

  return (
    <input
      onChange={handleOnChange}
      className="w-full p-1 xs:py-3 xs:px-4 xs:pr-6 placeholder:font-normal xs:placeholder:text-sm placeholder:text-slate-800 placeholder:text-sm rounded-md outline-none border-2 border-slate-800"
      type={type}
      placeholder={placeholder}
      id={name}
      name={name}
      value={value}
    />
  );
};

export default Input;
