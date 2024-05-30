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
      className="relative bg-slate-100 rounded-md  mx-auto max-w-[300px] w-full  xs:max-w-full flex flex-col justify-between border-slate-800 border-2 p-4 "
    >
      <div className="mx-auto">
        <LazyLoadImage
          src={`./product/${product.gambar}`}
          alt={product.nama}
          effect="blur"
          width={150}
          height={150}
          className="block"
          placeholderSrc={placeholder}
        />
      </div>

      <div className="content  h-full flex flex-col">
        <h3 className="font-semibold">{product.kode}</h3>
        <h1 className="font-bold text-xl py-2">{product.nama}</h1>
        <p className="font-medium">{Rupiah(product.harga)}</p>
      </div>

      <button
        className="mt-8 flex items-center bg-red-600 px-4 py-2 text-white w-fit rounded-md"
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
