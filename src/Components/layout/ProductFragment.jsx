import React, { useEffect, useState } from "react";
import CardComponent from "../fragments/Card";

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
    <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  md:gap-8 p-4">
      {filtered &&
        filtered.map((product) => (
          <CardComponent
            key={product.id}
            product={product}
            HandleAddProduct={HandleAddProduct}
          />
        ))}
    </ul>
  );
};

export default ProductFragment;
