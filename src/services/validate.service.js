import { useState } from "react";
import { getUser } from "./auth.service";

export const handleFormValidate = (name, value, main) => {
  const regex = /^[A-Za-z]*$/gi;
  const emails = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  const validations = {
    required: (value) => (value === "" ? `Enter your ${name}` : ""),
    minLength: (value, length, name) =>
      value.length <= length
        ? `${name} must be longer than ${length} characters!`
        : "",
    maxLength: (value, length, name) =>
      value.length >= length
        ? `${name} must be less than ${length} characters!`
        : "",
    notSameAs: (value, compareValue, field) =>
      value === compareValue ? `Value cannot be the same as ${field}` : "",
    alreadyExist: (value, CompareValue, name) =>
      value === CompareValue ? `${name} already Exist` : "",
    regexTest: (value, regex, message) => (regex.test(value) ? message : ""),
    emailTest: (value, email, message) => (!email.test(value) ? message : ""),
  };

  const rules = {
    username: [
      { validate: validations.required },
      { validate: (value) => validations.minLength(value, 6, "username") },
      { validate: (value) => validations.maxLength(value, 30, "username") },
      {
        validate: (value) => validations.notSameAs(value, main.email, "Email"),
      },
      {
        validate: (value) => validations.alreadyExist(value, main, "username"),
      },
    ],
    email: [
      { validate: validations.required },
      {
        validate: (value) =>
          validations.emailTest(value, emails, "Enter a valid email address!"),
      },
      {
        validate: (value) => validations.alreadyExist(value, main, "email"),
      },
    ],
    password: [
      { validate: validations.required },
      { validate: (value) => validations.minLength(value, 6, "password") },
      { validate: (value) => validations.maxLength(value, 30, "password") },
      {
        validate: (value) =>
          validations.notSameAs(value, main.username, "Username"),
      },
      {
        validate: (value) => validations.notSameAs(value, main.email, "Email"),
      },
      {
        validate: (value) =>
          validations.regexTest(
            value,
            regex,
            "Password at least contains number or special character!"
          ),
      },
    ],
  };

  if (rules[name]) {
    for (let rule of rules[name]) {
      const error = rule.validate(value);
      if (error) {
        return error;
      }
    }
  }

  return false;
};

export const handleLoginValidate = (name, value, main) => {
  const validations = {
    required: (value) => (value === "" ? `Enter your ${name}` : ""),
  };

  const rules = {
    username: [
      {
        validate: validations.required,
      },
    ],
    password: [
      {
        validate: validations.required,
      },
    ],
  };

  if (rules[name]) {
    for (let rule of rules[name]) {
      const error = rule.validate(value);

      if (error) {
        return error;
      }
    }
  }

  return false;
};
