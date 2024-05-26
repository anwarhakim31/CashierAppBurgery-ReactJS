import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/fetch.service";
import { RiDrinks2Fill } from "react-icons/ri";
import { GiFrenchFries } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";

const Icons = ({ icon }) => {
  if (icon === "Food") return <FaHamburger />;
  if (icon === "Bevarage") return <RiDrinks2Fill />;
  if (icon === "Snack") return <GiFrenchFries />;

  return;
};

const CategoryList = ({ handleByCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="category p-4 mb-4 flex justify-center items-center">
      {categories.map((category) => (
        <button
          key={category.id}
          className="btn-primary flex items-center gap-4"
          onClick={() => handleByCategory(category.id)}
        >
          <Icons icon={category.title} /> {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
