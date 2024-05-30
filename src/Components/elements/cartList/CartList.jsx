import React from "react";

import { Rupiah } from "../../../services/constant.service";
import { URL } from "../../../services/constant.service";
import { useDispatch } from "react-redux";
import { CiTrash } from "react-icons/ci";
import {
  setCartData,
  setLoading,
  setError,
  deleteFromCart,
} from "../../../redux/slices/cartSlice";
import axios from "axios";
const CartList = ({ list, handleEditCart }) => {
  const dispatch = useDispatch();

  const handleDeleteFromCart = (e) => {
    axios.delete(URL + "/keranjang/" + list.id).catch((error) => {});
    e.stopPropagation();
    dispatch(deleteFromCart(list.id));
  };

  return (
    <li
      className="relative border-1 border-slate-950 rounded-md mb-3 overflow-hidden pt-2 pb-2 cursor-pointer"
      onClick={() => handleEditCart(list.id)}
    >
      <h3 className="px-2 text-lg font-semibold select-none">
        {list.product.nama}{" "}
        <span className="font-medium">({list.product.kode})</span>{" "}
      </h3>
      <div className=" bg-slate-200 px-2">
        <p className="select-none">
          Category :{" "}
          <span className="font-medium">{list.product.category.nama}</span>
        </p>
      </div>
      <div className="flex items-center justify-between px-2">
        <p className="select-none">
          Total Price :{" "}
          <span className="font-medium">{Rupiah(list.Total_Harga)}</span>
        </p>
        <p className="select-none">
          Amount : <span className="font-medium">{list.jumlah}</span>
        </p>
      </div>
      <CiTrash
        className="absolute top-2 right-2 text-2xl"
        onClick={(e) => handleDeleteFromCart(e)}
      />
    </li>
  );
};

export default CartList;
