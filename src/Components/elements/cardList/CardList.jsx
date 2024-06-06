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
      className="relative bg-slate-100 rounded-xl  col-span-full xxs:col-span-2 xs:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2    xs:max-w-full flex flex-col justify-between border-slate-800 border-1 p-4 "
    >
      <div className="w-32 h-32  overflow-hidden mx-auto">
        <LazyLoadImage
          src={`./product/${product.gambar}`}
          alt={product.nama}
          effect="blur"
          className="block w-full h-full object-contain object-center"
          placeholderSrc={placeholder}
        />
      </div>

      <div className="content   flex flex-col">
        <h3 className="font-semibold text-xs md:text-sm">{product.kode}</h3>
        <h1 className="  text-sm  font-bold py-2">{product.nama}</h1>
        <p className="font-medium text-xs md:text-sm">
          {Rupiah(product.harga)}
        </p>
      </div>

      <button
        className="mt-4 flex items-center bg-red-600 px-4 py-1 text-sm  md:px-4 md:py-1.5 text-white w-fit rounded-xl"
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
