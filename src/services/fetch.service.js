import React from "react";
import { URL } from "./constant.service";
import axios from "axios";

export const getCategory = (callback) => {
  axios
    .get(URL + "/category")
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
