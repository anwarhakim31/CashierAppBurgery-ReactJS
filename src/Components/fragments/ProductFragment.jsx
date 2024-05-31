import React, { useEffect, useState } from "react";
import CardList from "../elements/cardList/CardList";

const ProductFragment = (props) => {
  const { productList, id, HandleAddProduct } = props;
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    const byCategory = productList.filter((product) => {
      return product.category.id == id;
    });
    setFiltered(byCategory);
  }, [productList, id]);

  return (
    <ul className="font-inter grid grid-cols-1 gap-6 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 md:gap-8 md:p-4">
      {filtered &&
        filtered.map((product) => (
          <CardList
            key={product.id}
            product={product}
            HandleAddProduct={HandleAddProduct}
          />
        ))}
    </ul>
  );
};

export default ProductFragment;
