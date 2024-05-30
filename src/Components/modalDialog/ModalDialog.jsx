import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Rupiah, URL } from "../../services/constant.service";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, editFromCart } from "../../redux/slices/cartSlice";

const ModalDialog = forwardRef((props, ref) => {
  const { cartEdit, isIdEdit, handleModalClose } = props;
  const [product, setProduct] = useState({});
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isIdEdit) {
      axios
        .get(URL + "/keranjang/" + isIdEdit)
        .then((res) => {
          setProduct(res.data);
          setAmount(res.data.jumlah);
          setTotalPrice(res.data.Total_Harga);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isIdEdit]);

  useEffect(() => {
    setDetail("");
    if (cartEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartEdit]);

  const addAmount = () => {
    setAmount(amount + 1);
    setTotalPrice((amount + 1) * product.product.harga);
  };

  const lessAmount = () => {
    if (amount <= 1) {
      handleDeleteFromCart();
    } else {
      setAmount(amount - 1);
      setTotalPrice((amount - 1) * product.product.harga);
    }
  };

  const handleSaveToCart = () => {
    const data = {
      ...product,
      Total_Harga: totalPrice,
      jumlah: amount,
      keterangan: detail,
    };

    axios.put(URL + "/keranjang/" + isIdEdit, data).catch((error) => {
      console.log(error);
    });

    dispatch(editFromCart(data));

    handleModalClose();
  };

  const handleDeleteFromCart = () => {
    axios.delete(URL + "/keranjang/").catch((error) => {
      console.log(error);
    });

    dispatch(deleteFromCart(isIdEdit));

    handleModalClose();
  };

  return (
    <div
      onClick={(e) => {
        e.target === e.currentTarget && handleModalClose();
      }}
      ref={ref}
      className={`modal ${
        cartEdit ? "" : "hidden"
      } fixed top-0 left-0 flex justify-center z-40 bg-slate-600/15 items-center w-screen min-h-screen`}
    >
      <div className="w-full flex flex-col px-5 py-8 max-w-[450px] relative bg-white rounded-md">
        <h1 className="mb-4 text-xl font-semibold">
          {product?.product?.nama}{" "}
          <span>({Rupiah(product?.product?.harga)})</span>
        </h1>
        <hr className="h-px bg-gray-900 border-0 dark:bg-gray-700" />
        <label className="mt-4 font-semibold" htmlFor="harga">
          Total Price :
        </label>
        <p className="harga mb-2">{Rupiah(totalPrice)}</p>
        <label className="mt-4 font-semibold" htmlFor="harga">
          Amount :
        </label>
        <div className="flex gap-1 items-center py-2">
          <button
            className="bg-blue-800 text-white px-2 py-1  rounded-sm"
            onClick={lessAmount}
          >
            <FaMinus />
          </button>
          <p className="mx-2">{amount}</p>
          <button
            className="bg-blue-800 text-white px-2  py-1 rounded-sm"
            onClick={addAmount}
          >
            <FaPlus />
          </button>
        </div>
        <label htmlFor="keterangan">Details Order : </label>
        <textarea
          onChange={(e) => setDetail(e.target.value)}
          className="my-2 p-2 border-1 border-slate-900"
          name="keterangan"
          id="keterangan"
          placeholder="spicy"
          value={detail}
        ></textarea>
        <div className="flex justify-between">
          {" "}
          <button
            className="bg-red-600 w-fit p-2 mt-4 text-white rounded-md"
            onClick={handleDeleteFromCart}
          >
            Delete To Cart
          </button>
          <button
            className="bg-green-600 w-fit p-2 mt-4 text-white rounded-md"
            onClick={handleSaveToCart}
          >
            Save To Cart
          </button>
        </div>

        <RiCloseLine
          className="absolute top-2 right-4 text-2xl cursor-pointer"
          onClick={handleModalClose}
        />
      </div>
    </div>
  );
});

ModalDialog.displayName = "ModalDialog";

export default ModalDialog;
