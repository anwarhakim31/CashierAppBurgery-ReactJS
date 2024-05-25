import React from "react";
import useLogin from "../hooks/useLogin";
import Button from "../elements/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = useLogin();

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  return (
    <header className="w-full bg-blue-600 p-4">
      <div className="container flex justify-end items-center">
        <span className="text-white first-letter:uppercase text-xs md:text-lg">
          {username}
        </span>
        <button
          onClick={handleLogout}
          className="bg-slate-900  text-white px-2 py-2 text-xs md:text-lg md:px-4 md:py-2 rounded-md mx-4"
        >
          Logout{" "}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
