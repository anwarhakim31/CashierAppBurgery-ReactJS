import React, { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import Button from "../elements/button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { getCart } from "../../services/fetch.service";

const Navbar = (props) => {
  const { handleCartOpen, id, increament } = props;
  const [cartLength, setCartLength] = useState("");

  const username = useLogin();
  const Navigate = useNavigate();

  useEffect(() => {
    getCart((data) => {
      setCartLength(data);
    });
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  return (
    <header className="w-full bg-red-600 p-4 fixed z-10">
      <div className="lg:container flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className="block lg:w-[60px] lg:h-[60px] w-[45px] h-[45px]"
        />
        <div className="extra flex items-center">
          <span className="text-white first-letter:uppercase text-xs md:text-lg">
            {username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-slate-900  text-white px-2 py-1 text-xs md:text-lg md:px-3 md:py-1 rounded-md mx-4"
          >
            Logout
          </button>
          <button
            className="btn-primary relative  rounded-full w-6 h-6 md:w-10 md:h-10 grid place-content-center"
            onClick={handleCartOpen}
          >
            <small className="absolute -bottom-2 left-1 text-white font-bold">
              {cartLength.length}
            </small>{" "}
            <FaCartShopping />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
