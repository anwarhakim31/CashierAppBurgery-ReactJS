import React from "react";
import Navbar from "../Components/layout/Navbar";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center text-center">
        <div>
          <h3 className="text-3xl font-semibold text-transparent bg-gradient-to-tr  from-blue-500 via-teal-400 to-teal-400 bg-clip-text">
            Oops!
          </h3>
          <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-teal-400 to-teal-400 bg-clip-text">
            404
          </h1>
          <p className="font-semibold text-xl bg-gradient-to-r my-4 from-blue-500  to-teal-400 bg-clip-text text-transparent">
            Page Not Found
          </p>
          <p className="font-semibold text-xl bg-gradient-to-r w-100 max-w-xl mx-auto from-blue-500 to-teal-400 bg-clip-text text-transparent">
            We couldn’t find the page that you’re looking for. Please check the
            address and try again.
          </p>
          <Link
            to={"/"}
            className="py-2 px-4 bg-red-600 text-white font-bold text-xl block w-fit mx-auto mt-8 rounded-md"
          >
            Go to Burgery
          </Link>
        </div>
      </div>
    </>
  );
};
