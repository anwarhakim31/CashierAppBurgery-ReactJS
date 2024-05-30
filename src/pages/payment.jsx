import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/layout/Navbar";
import { Rupiah } from "../services/constant.service";
import { getCart } from "../services/fetch.service";

const PaymentPage = () => {
  const [inCart, setInCart] = useState([]);
  const [orderName, setOrderName] = useState("");
  const { cash, setCash } = useState(null);
  const [confirmedValue, setConfirmedValue] = useState(0);

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

  console.log(confirmedValue < sum);

  return (
    <>
      <Navbar />
      <div className="pt-28  max-w-[960px] mx-auto p-4 flex justify-between  gap-2">
        <div className="payment text-center w-1/2 lg:w-4/6 mx-4">
          <h1 className="font-medium text-xl lg:text-3xl text-center ">
            Payment
          </h1>

          <form className="px-6 py-2 mt-4">
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between gap-1 lg:gap-4 mb-2">
              <label
                htmlFor="orderer"
                className="font-medium text-xs lg:text-lg text-nowrap"
              >
                Orderer's Name :{" "}
              </label>
              <input
                onChange={(e) => setOrderName(e.target.value)}
                value={orderName}
                type="text"
                id="orderer"
                className="border-1 border-slate-900 px-1 lg:px-2 lg:py-1 max-w-96 w-full rounded-sm"
              />
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1 lg:gap-4 mb-2">
              <h2 className="font-medium text-xs lg:text-lg">
                Total Payment :{" "}
              </h2>
              <span className="text-xs lg:text-lg lg:ml-3">{Rupiah(sum)}</span>
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between gap-1 lg:gap-4 mb-2">
              <label
                htmlFor="orderer"
                className="font-medium text-xs lg:text-lg text-nowrap"
              >
                Amount Paid :{" "}
              </label>
              <input
                onChange={(e) => setCash(e.target.value)}
                value={cash}
                onBlur={handleBlur}
                type="number"
                id="orderer"
                className="border-1 border-slate-900 px-1 lg:px-2 lg:py-1 max-w-96 w-full rounded-sm"
              />
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1 lg:gap-4 mb-2">
              <h2 className="font-medium text-xs lg:text-lg">
                Change Given :{" "}
              </h2>
              <span className="text-xs lg:text-lg lg:ml-3">
                {(confirmedValue >= sum && Rupiah(confirmedValue - sum)) ||
                  Rupiah(0)}
              </span>
            </div>
          </form>
        </div>
        <div className="order w-1/2 lg:w-1/3">
          <h1 className="font-medium text-xl lg:text-3xl text-center ">
            Order
          </h1>
          <ul className="border-1 border-slate-900 px-6 mt-4 py-2 rounded-md overflow-y-auto h-[75vh]">
            {inCart.length !== 0 &&
              inCart
                .sort((a, b) => {
                  return b.product.kode - a.product.kode;
                })
                .map((item) => {
                  return (
                    <li key={item.id}>
                      <h2 className="text-xs lg:text-lg">
                        {item.product.nama} <span>({item.product.kode})</span>
                      </h2>
                      <h3 className="bg-slate-200 text-xs lg:text-lg">
                        Category : <span>{item.product.category.nama}</span>
                      </h3>
                      <h4 className="text-xs lg:text-lg">
                        Unit Pice : <span>{Rupiah(item.product.harga)}</span>
                      </h4>
                      <div className="flex justify-between items-center text-sm flex-wrap lg:flex-nowrap bg-slate-200">
                        <h5 className="text-xs lg:text-lg">
                          Total Amount : <span>{item.jumlah}</span>
                        </h5>
                        <h5 className="text-xs lg:text-lg">
                          Total Price : <span>{Rupiah(item.Total_Harga)}</span>
                        </h5>
                      </div>
                      {item?.keterangan && (
                        <p className="text-xs lg:text-lg">
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
