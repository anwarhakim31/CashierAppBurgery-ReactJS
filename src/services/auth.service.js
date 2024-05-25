import axios from "axios";
import { URL } from "./constant.service";
import Swal from "sweetalert2";

export const postUser = (data) => {
  axios
    .post(URL + "/users", data)
    .then((res) => {
      Swal.fire({
        // Corrected function name to Swal.fire
        title: "Success!",
        text: "Success Create Acoount!",
        icon: "success",
        confirmButtonText: "ok",
        timer: 1000,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUser = (callback) => {
  axios
    .get(URL + "/users")
    .then((res) => callback(res))
    .catch((error) => {
      console.log(error);
    });
};
