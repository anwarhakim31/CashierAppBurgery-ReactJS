import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/layout/Navbar";
import { Rupiah, URL } from "../services/constant.service";
import { getCart } from "../services/fetch.service";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/images/logo2.png";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [inCart, setInCart] = useState([]);
  const [orderName, setOrderName] = useState("");
  const [cashValue, setCashValue] = useState(null);
  const [confirmedValue, setConfirmedValue] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    getCart((data) => {
      setInCart(data);
    });
  }, []);

  const sum = inCart.reduce((acc, item) => {
    return acc + item.Total_Harga;
  }, 0);

  const handleBlur = (event) => {
    setConfirmedValue(event.target.value);
  };

  const handleToBack = () => {
    Navigate("/cashier");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Nama_Pemesan: orderName,
      Total_Bayar: sum,
      Uang_cash: cashValue,
      kembalian: confirmedValue - sum,
      ...inCart,
    };

    try {
      await axios.post(URL + "/pesanan/", data);
      inCart.forEach((item) => {
        axios.delete(URL + "/keranjang/" + item.id);
      });

      setInCart([]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Success",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        Navigate("/cashier");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="pt-[100px] max-w-[960px] mx-auto p-4 flex justify-between  gap-2">
        <div className="payment text-center w-1/2 lg:w-4/6 mx-4">
          <h1 className="font-medium text-xl lg:text-3xl text-center ">
            Payment
          </h1>

          <form className="px-6 py-2 mt-4" onSubmit={handleSubmit}>
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between gap-1 lg:gap-4 mb-2">
              <label
                htmlFor="orderer"
                className="font-medium text-xs lg:text-[1rem] py-1 text-nowrap"
              >
                Orderer's Name :{" "}
              </label>
              <input
                onChange={(e) => setOrderName(e.target.value)}
                value={orderName}
                type="text"
                id="orderer"
                required
                className="border-1 border-slate-900 px-1 lg:px-2 lg:py-1 max-w-96 w-full rounded-sm"
              />
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1 lg:gap-4 mb-2">
              <h2 className="font-medium text-xs lg:text-[1rem] py-1">
                Total Payment :{" "}
              </h2>
              <span className="text-xs lg:text-[1rem] py-1 lg:ml-3">
                {Rupiah(sum)}
              </span>
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between gap-1 lg:gap-4 mb-2">
              <label
                htmlFor="orderer"
                className="font-medium text-xs lg:text-[1rem] py-1 text-nowrap"
              >
                Amount Paid :{" "}
              </label>
              <input
                onChange={(e) => setCashValue(e.target.value)}
                onBlur={handleBlur}
                type="number"
                id="orderer"
                className="border-1 border-slate-900 px-1 lg:px-2 lg:py-1 max-w-96 w-full rounded-sm"
                required
              />
            </div>

            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1 lg:gap-4 mb-2">
              <h2 className="font-medium text-xs lg:text-[1rem] py-1">
                Change Given :{" "}
              </h2>
              <span className="text-xs lg:text-[1rem] py-1 lg:ml-3">
                {(confirmedValue >= sum && Rupiah(confirmedValue - sum)) ||
                  Rupiah(0)}
              </span>
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap  mt-10 gap-4 lg:gap-4 mb-2">
              <button
                className="px-8 py-2 bg-red-600 rounded-md text-white"
                onClick={handleToBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 rounded-md text-white"
              >
                Pay
              </button>
            </div>
          </form>
          <img
            src={logo}
            alt=""
            className="mx-auto mt-10 w-[75px] h-[75px] lg:w-[150px] lg:h-[150px]"
          />
        </div>
        <div className="order w-1/2 lg:w-1/3 px-4">
          <h1 className="font-medium text-xl lg:text-3xl text-center ">
            Order
          </h1>
          <ul className="border-1 border-slate-900 px-2 mt-4 py-2 rounded-md overflow-y-auto h-[75vh]">
            {inCart.length !== 0 &&
              inCart
                .sort((a, b) => {
                  return b.product.kode - a.product.kode;
                })
                .map((item) => {
                  return (
                    <li key={item.id}>
                      <h2 className="text-xs lg:text-[1rem] py-1">
                        {item.product.nama} <span>({item.product.kode})</span>
                      </h2>
                      <h3 className="bg-slate-200 text-xs lg:text-[1rem] py-1">
                        Category : <span>{item.product.category.nama}</span>
                      </h3>
                      <h4 className="text-xs lg:text-[1rem] py-1">
                        Unit Pice : <span>{Rupiah(item.product.harga)}</span>
                      </h4>
                      <div className="flex justify-between items-center text-sm flex-wrap  bg-slate-200">
                        <h5 className="text-xs lg:text-[1rem] py-1">
                          Total Amount : <span>{item.jumlah}</span>
                        </h5>
                        <h5 className="text-xs lg:text-[1rem] py-1">
                          Total Price : <span>{Rupiah(item.Total_Harga)}</span>
                        </h5>
                      </div>
                      {item?.keterangan && (
                        <p className="text-xs lg:text-[1rem] py-1">
                          Keterangan : <span>{item.keterangan}</span>
                        </p>
                      )}
                      <hr className="h-px bg-gray-900 border-0 dark:bg-gray-700 my-2" />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
