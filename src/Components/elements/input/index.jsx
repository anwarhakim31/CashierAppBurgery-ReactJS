import React, { useRef, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const InputComponent = (props) => {
  const { type, placeholder, name, label, handleOnChange, value, error } =
    props;

  const pathName = useLocation().pathname;

  const [isShow, setIsShow] = useState(false);

  const handleShowPass = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="mb-4 relative">
      <Label name={name}>{label}</Label>
      <Input
        type={name === "password" && isShow ? "text" : type}
        placeholder={placeholder}
        name={name}
        handleOnChange={handleOnChange}
        value={value}
      />
      {name === "password" &&
        (isShow ? (
          <FaEye
            className="absolute bottom-4 right-2 cursor-pointer "
            onClick={handleShowPass}
          />
        ) : (
          <FaEyeSlash
            className="absolute bottom-4 right-2 cursor-pointer "
            onClick={handleShowPass}
          />
        ))}
      {
        <small
          className={`${
            error === "Password at least contains number or special character"
              ? "-bottom-6 text-xs"
              : "-bottom-5"
          } absolute font-medium  first-letter:capitalize  left-1 text-red-500 select-none`}
        >
          {error}
        </small>
      }
    </div>
  );
};

export default InputComponent;
