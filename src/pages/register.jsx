import React from "react";
import AuthLayout from "../Components/layout/AuthLayout";
import FormRegister from "../Components/fragments/FormRegister";
import useLogin from "../assets/hooks/useLogin";

const RegisterPage = () => {
  return (
    <AuthLayout type="Register" title="Please Create Account">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
