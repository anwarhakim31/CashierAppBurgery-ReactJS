import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";

import "./index.css";
import RegisterPage from "./pages/register";
import CashierPage from "./pages/chashier";
import { Provider } from "react-redux";
import store from "./redux/store";
import PaymentPage from "./pages/payment";
import { NotFoundPage } from "./pages/404";
document.body.classList.add("font-inter");

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/cashier",
    element: <CashierPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
