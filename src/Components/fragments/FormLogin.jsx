import React, { useEffect, useRef, useState } from "react";
import Button from "../elements/button";
import InputComponent from "../elements/input/index";
import {
  handleFormValidate,
  handleLoginValidate,
} from "../../services/validate.service";
import { getUser } from "../../services/auth.service";

const FormLogin = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });

  const [wrong, setIsWrong] = useState(false);
  const [remember, setRemember] = useState(false);

  const checked = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      setLogin({ username: username, password: password });
      setRemember(true);
      checked.current.checked = true;
    }
  }, []);

  useEffect(() => {
    if (remember) {
      localStorage.setItem("username", login.username);
      localStorage.setItem("password", login.password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  }, [remember, login]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setError({ username: "", password: "" });

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnCheck = () => {
    setRemember(!remember);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const usernameError = handleLoginValidate(
      "username",
      login.username,
      login
    );
    const passwordError = handleLoginValidate(
      "password",
      login.password,
      login
    );

    setError({ username: usernameError, password: passwordError });

    if (!passwordError && !usernameError) {
      getUser((data) => {
        const users = data.data.find(
          (user) => user.username === login.username
        );

        if (users.password === login.password) {
          setIsWrong(false);
          const token = Date.now();

          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("profile", JSON.stringify(users.username));

          window.location.href = "/cashier";
        } else {
          setIsWrong(true);
          setTimeout(() => {
            setIsWrong(false);
          }, 2000);
        }
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <InputComponent
        type="text"
        placeholder="Enter Your Username"
        name="username"
        label="Username"
        handleOnChange={handleOnChange}
        value={login.username}
        error={error.username}
      />
      <InputComponent
        type="password"
        placeholder="Enter Your Password"
        name="password"
        label="Password"
        handleOnChange={handleOnChange}
        value={login.password}
        error={error.password}
      />

      <div className={`${wrong ? "" : "mb-5"}`}>
        <input
          ref={checked}
          type="checkbox"
          name="remember"
          id="remember"
          onChange={handleOnCheck}
        />
        <label htmlFor="remember" className="ml-2">
          Remember Me
        </label>
      </div>
      <p
        className={`${
          wrong ? "translate-y-4" : "hidden"
        } text-sm xs:text-[1rem] text-center text-slate-900`}
      >
        Your Username or Password is wrong!
      </p>
      <Button>Login</Button>
    </form>
  );
};

export default FormLogin;
