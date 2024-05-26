import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardComponent = (props) => {
  const { product, HandleAddProduct } = props;
  const placeholder = `./placeholder/placeholder-image.jpg`;

  return (
    <li
      key={product.id}
      className="bg-slate-100 rounded-md max-w-[250px] lg:max-w-full p-6 shadow-xl  flex flex-col justify-between border-slate-800 border-2"
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

      <div className="content  h-full">
        <h3 className="font-semibold">{product.kode}</h3>
        <h1 className="font-bold text-xl py-2">{product.nama}</h1>
        <p className="font-medium">{product.harga}</p>
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

export default CardComponent;
