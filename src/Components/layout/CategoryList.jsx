import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/fetch.service";

const CategoryList = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory((data) => {
      setCategory(data);
    });
  }, [category]);

  return (
    <div className="category p-4 mb-4 flex justify-center items-center">
      {category &&
        category.map((list) => (
          <button key={list.id} className="btn-primary">
            {list.title}
          </button>
        ))}
    </div>
  );
};

export default CategoryList;
