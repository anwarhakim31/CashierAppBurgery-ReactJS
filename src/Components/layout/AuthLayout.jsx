import React, { useEffect } from "react";
import logo from "../../assets/images/logo2.png";
import { Link, useNavigate } from "react-router-dom";

const AuthLayout = (props) => {
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Navigate("/cashier");
    }
  }, []);

  const { children, type, title } = props;
  return (
    <div className=" max-w-sreen  min-h-screen flex justify-center items-center font-inter">
      <div className="card w-full   sm:max-w-[420px] min-h-screen   xs:block  sm:min-h-fit shadow-md shadow-slate-800 bg-gradient-to-b from-white via-white to-red-600 py-2 px-4 xs:p-8 bg-slate-200 rounded-none md:rounded-lg">
        <img className="mx-auto xs:mb-4 w-16 h-16" src={logo} alt="burgery" />

        <h1 className="font-bold mb-4 text-xl xs:text-2xl text-slate-900">
          {type}
        </h1>
        <p className="mb-4 xs:mb-4">{title}</p>
        {children}
        {type === "Login" && (
          <p className="text-center mt-2">
            Don't have an account?
            <Link to={"/register"} className="ml-2 font-bold hover:underline">
              Register
            </Link>
          </p>
        )}
        {type === "Register" && (
          <p className="text-center mt-2">
            have an account?
            <Link to={"/login"} className="ml-2 font-bold hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
