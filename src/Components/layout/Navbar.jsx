import React, { useEffect, useState } from "react";
import useLogin from "../../assets/hooks/useLogin";
import Button from "../elements/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { getCart } from "../../services/fetch.service";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const location = useLocation();
  const pathName = location.pathname;

  const { handleCartOpen } = props;
  const [cartLength, setCartLength] = useState([]);
  const cart = useSelector((state) => state.cart.data);

  const username = useLogin();
  const Navigate = useNavigate();

  // useEffect(() => {
  //   getCart((data) => {
  //     setCartLength(data);
  //   });
  // }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const sum = cart.reduce((acc, item) => {
    return acc + item.jumlah;
  }, 0);

  return (
    <header className="w-full bg-red-600 p-4 fixed z-10">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className="mx-4 block lg:w-[60px] lg:h-[60px] w-[45px] h-[45px]"
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
            className={`${
              pathName === "/payment" ? "hidden" : ""
            } btn-primary relative  rounded-full  lg:w-10 lg:h-10 grid place-content-center`}
            onClick={handleCartOpen}
          >
            <small className="absolute -bottom-2 left-1 text-white font-bold">
              {sum}
            </small>{" "}
            <FaCartShopping />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
