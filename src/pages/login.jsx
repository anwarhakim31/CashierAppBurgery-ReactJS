import React, { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import AuthLayout from "../Components/layout/AuthLayout";
import FormLogin from "../Components/fragments/FormLogin";

const LoginPage = () => {
  return (
    <AuthLayout type="Login" title="Please Insert Your Details.">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
