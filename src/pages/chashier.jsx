import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/layout/Navbar";
import CategoryList from "../Components/layout/CategoryList";
import ProductFragment from "../Components/fragments/ProductFragment";
import { getCart, getProduct } from "../services/fetch.service";
import Cart from "../Components/fragments/CartFragment";
import axios from "axios";
import { URL } from "../services/constant.service";

import { useSelector, useDispatch } from "react-redux";
import {
  setCartData,
  setLoading,
  setEditData,
} from "../redux/slices/cartSlice";
import { addToCart } from "../redux/slices/cartSlice";
import ModalDialog from "../Components/modalDialog/ModalDialog";
import CartFragment from "../Components/fragments/CartFragment";

const CashierPage = () => {
  const [productList, setProductList] = useState([]);
  const [id, setId] = useState(1);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartEdit, setCartEdit] = useState(false);
  const [isIdEdit, setIsIdEdit] = useState(null);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const modalRef = useRef(null);

  const handleEditCart = (id) => {
    setCartEdit(true);
    setIsIdEdit(id);
  };

  const handleModalClose = () => {
    setCartEdit(false);
  };

  const handleCartOpen = () => {
    setCartOpen(!cartOpen);
    const fetchCartData = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get(URL + "/keranjang");
        dispatch(setEditData(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartData();
  };

  const handleClickOutside = (event) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    if (cartOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cartOpen]);

  const HandleAddProduct = (product) => {
    if (!cartOpen) {
      getCart((data) => {
        const list = data.find((item) => item.product.id == product.id);

        if (!list) {
          const cart = {
            Total_Harga: product.harga,
            jumlah: 1,
            product: product,
          };
          dispatch(addToCart(cart));
          axios
            .post(URL + "/keranjang", cart)
            .catch((err) => setError(err.message));
        } else {
          const cart = {
            Total_Harga: product.harga * list.jumlah,
            jumlah: list.jumlah + 1,
            product: product,
          };

          dispatch(addToCart(cart));
          axios
            .put(URL + "/keranjang/" + list.id, cart)
            .catch((err) => setError(err.message));
        }
      });
    }
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
      <Navbar
        handleCartOpen={(e) => {
          e.stopPropagation();
          handleCartOpen();
        }}
      />
      <main className="pt-24">
        <div className="max-w-[1280px] px-4 mx-auto">
          <CategoryList handleByCategory={handleByCategory} id={id} />
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
      <div ref={cartRef}>
        <CartFragment
          cartOpen={cartOpen}
          handleCartOpen={handleCartOpen}
          handleEditCart={handleEditCart}
        />
      </div>
      <ModalDialog
        ref={modalRef}
        cartEdit={cartEdit}
        isIdEdit={isIdEdit}
        handleModalClose={handleModalClose}
      />
    </>
  );
};

export default CashierPage;
