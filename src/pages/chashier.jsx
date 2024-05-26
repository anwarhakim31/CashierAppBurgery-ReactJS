import React, { useEffect, useState } from "react";
import Navbar from "../Components/layout/Navbar";
import CategoryList from "../Components/layout/CategoryList";
import ProductFragment from "../Components/layout/ProductFragment";
import { getCart, getProduct } from "../services/fetch.service";
import Cart from "../Components/fragments/Cart";
import axios from "axios";
import { URL } from "../services/constant.service";

const CashierPage = () => {
  const [productList, setProductList] = useState([]);
  const [id, setId] = useState(1);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [increament, setIncreament] = useState(0);

  const handleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  setInterval(() => {
    setIncreament(increament + 1);
  }, 1000);

  const HandleAddProduct = (product) => {
    getCart((data) => {
      const list = data.find((item) => item.product.id == product.id);

      if (!list) {
        const cart = {
          Total_Harga: product.harga,
          jumlah: 1,
          product: product,
        };

        axios.post(URL + "/keranjang", cart);
      } else {
        const cart = {
          Total_Harga: product.harga * list.jumlah,
          jumlah: list.jumlah + 1,
          product: product,
        };

        axios.put(URL + "/keranjang/" + list.id, cart);
      }
    });
  };

  useEffect(() => {
    const fetchData = () => {
      getProduct(
        (data) => {
          setProductList(data);
        },
        (error) => {
          setError(error.message);
        }
      );
    };

    fetchData();
  }, [id]);

  const handleByCategory = (id) => {
    setId(id);
  };

  return (
    <>
      <Navbar handleCartOpen={handleCartOpen} id={id} increament={increament} />
      <main className="pt-24">
        <div className="lg:container">
          <CategoryList handleByCategory={handleByCategory} />
          {error ? (
            <p>Error fetching products: {error}</p>
          ) : (
            <ProductFragment
              id={id}
              productList={productList}
              HandleAddProduct={HandleAddProduct}
            />
          )}
        </div>
      </main>
      <Cart cartOpen={cartOpen} handleCartOpen={handleCartOpen} />
    </>
  );
};

export default CashierPage;
