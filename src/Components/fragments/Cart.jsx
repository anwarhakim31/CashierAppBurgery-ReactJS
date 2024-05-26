import { RiCloseLine } from "react-icons/ri";

const Cart = (props) => {
  const { cartOpen, handleCartOpen } = props;

  return (
    <div
      className={`${
        cartOpen ? "" : "hidden"
      } fixed z-20 top-0 right-0 w-full xs:w-[250px] md:w-[350px] min-h-screen bg-white shadow-xl p-4`}
    >
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-2xl">Cart</h1>
        <button
          className="p-2 bg-red-600 rounded-full"
          onClick={handleCartOpen}
        >
          <RiCloseLine className="text-white" />
        </button>
      </header>

      <ul></ul>
    </div>
  );
};

export default Cart;
