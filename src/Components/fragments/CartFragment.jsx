import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getCart } from "../../services/fetch.service";
import CartList from "../elements/cartList/CartList";
import { Rupiah } from "../../services/constant.service";
import { useSelector } from "react-redux";
import { BsFillCartXFill } from "react-icons/bs";
import emptyLogo from "../../assets/images/empty-cart.png";
import { useNavigate } from "react-router-dom";

const CartFragment = (props) => {
  const { cartOpen, handleCartOpen, handleEditCart } = props;
  const [inCart, setInCart] = useState([]);
  const data = useSelector((state) => state.cart.data);
  const navigate = useNavigate();

  useEffect(() => {
    getCart((data) => {
      setInCart(data);
    });
  }, [cartOpen, data]);

  const payment = () => {
    navigate("/payment");
  };

  const TotalBayar = inCart.reduce((acc, item) => {
    return acc + item.Total_Harga;
  }, 0);

  return (
    <div
      className={`${
        cartOpen ? "top-0 right-0 opacity-1" : "opacity-0 top-0 -right-[600px]"
      } fixed z-20  w-full xs:w-[450px] md:w-[370px] min-h-screen bg-white shadow-xl p-4 transition-all ease-in-out duration-500`}
    >
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Cart</h1>
        <button
          className="p-2 bg-red-600 rounded-full"
          onClick={handleCartOpen}
        >
          <RiCloseLine className="text-white" />
        </button>
      </header>
      <div className="h-[80vh] overflow-y-auto ">
        <ul className="mb-[10%] mt-2 relative">
          {inCart.length === 0 && (
            <li className="text-center">
              <img
                src={emptyLogo}
                alt="empty"
                width={300}
                height={300}
                className="block mx-auto"
              />
              <p className="font-semibold text-xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent ">
                Cart Is Empty
              </p>
            </li>
          )}

          {inCart &&
            [...inCart]
              .reverse()
              .map((list) => (
                <CartList
                  handleEditCart={handleEditCart}
                  key={list.id}
                  list={list}
                />
              ))}
        </ul>
      </div>
      <div className={`${inCart.length === 0 ? "hidden" : ""}`}>
        <h1 className="mt-2 font-bold text-xl">
          Total Payment : <span>{inCart && Rupiah(TotalBayar)}</span>{" "}
        </h1>
        <button
          className="w-full mt-2 xs:mt-2 p-1 text-center text-white bg-red-600 rounded-lg"
          onClick={payment}
        >
          Payment Menu
        </button>
      </div>
    </div>
  );
};

export default CartFragment;
