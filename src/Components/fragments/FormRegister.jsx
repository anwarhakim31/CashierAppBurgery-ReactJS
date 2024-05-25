import React, { useEffect, useState } from "react";
import InputComponent from "../elements/input";
import Button from "../elements/button";
import { handleFormValidate } from "../../services/validate.service";
import { getUser, postUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const Navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser((data) => {
      setUsers(data.data);
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const valTrim = value.trim();

    const validationError = handleFormValidate(name, valTrim, register);

    const exist = users.find((user) => user[name] === valTrim);

    const updatedError = { ...error, [name]: validationError };

    if (exist) {
      if (name === "username") {
        const errorUsername = handleFormValidate(name, valTrim, exist.username);
        updatedError.username = errorUsername;
      }
      if (name === "email") {
        const errorEmail = handleFormValidate(name, valTrim, exist.email);
        updatedError.email = errorEmail;
      }
    }

    setError(updatedError);

    setRegister((prevState) => ({
      ...prevState,
      [name]: valTrim,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const emailError = handleFormValidate("email", register.email, register);
    const usernameError = handleFormValidate(
      "username",
      register.username,
      register
    );
    const passwordError = handleFormValidate(
      "password",
      register.password,
      register
    );

    setError({
      email: emailError,
      username: usernameError,
      password: passwordError,
    });

    if (!emailError && !usernameError && !passwordError) {
      postUser(register);
      Navigate("/login");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <InputComponent
        type="text"
        placeholder="Enter Your Email..."
        name="email"
        label="Email"
        handleOnChange={handleOnChange}
        value={register.email}
        error={error.email}
      />
      <InputComponent
        type="text"
        placeholder="Enter Your Username..."
        name="username"
        label="Username"
        handleOnChange={handleOnChange}
        value={register.username}
        error={error.username}
      />
      <InputComponent
        type="password"
        placeholder="Enter Your password"
        name="password"
        label="Password"
        handleOnChange={handleOnChange}
        value={register.password}
        error={error.password}
      />

      <Button>Create Account</Button>
    </form>
  );
};

export default FormRegister;
