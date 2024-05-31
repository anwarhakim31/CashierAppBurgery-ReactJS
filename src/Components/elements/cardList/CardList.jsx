import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Rupiah, URL } from "../../../services/constant.service";
import { useDispatch } from "react-redux";
import { CiTrash } from "react-icons/ci";
import {
  setCartData,
  setLoading,
  setError,
  deleteFromCart,
} from "../../../redux/slices/cartSlice";
import axios from "axios";

const CardList = (props) => {
  const { product, HandleAddProduct } = props;
  const placeholder = `./placeholder/placeholder-image.jpg`;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get(URL + "/keranjang");
        dispatch(setCartData(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    fetchCartData();
  }, [dispatch]);

  return (
    <li
      key={product.id}
      className="relative bg-slate-100 rounded-md  mx-auto max-w-[250px] w-full  xs:max-w-full flex flex-col justify-between border-slate-800 border-1 p-4 "
    >
      <div className="mx-auto">
        <LazyLoadImage
          src={`./product/${product.gambar}`}
          alt={product.nama}
          effect="blur"
          className="block w-[100px] h-[100px] md:w-[150px] md:h-[150px] "
          placeholderSrc={placeholder}
        />
      </div>

      <div className="content  h-full flex flex-col">
        <h3 className="font-semibold text-xs md:text-xl">{product.kode}</h3>
        <h1 className="font-bold  text-sm md:text-xl py-2">{product.nama}</h1>
        <p className="font-medium text-xs md:text-lg">
          {Rupiah(product.harga)}
        </p>
      </div>

      <button
        className="mt-8 flex items-center bg-red-600 px-2 py-1  md:px-4 md:py-2 text-white w-fit rounded-md"
        onClick={() => HandleAddProduct(product)}
      >
        <span>
          <FaCartPlus className="mr-2" />
        </span>
        Add
      </button>
    </li>
  );
};

export default CardList;
