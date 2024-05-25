import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = localStorage.getItem("token");

    if (token) {
      setUsername(user);
    } else {
      Navigate("/");
    }
  }, []);

  return username;
};

export default useLogin;
