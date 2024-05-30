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

const CategoryList = ({ handleByCategory, id }) => {
  const [categories, setCategories] = useState([]);
  const [idF, setIdF] = useState(1);

  useEffect(() => {
    getCategory((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="category p-4 mb-4 flex justify-center items-center flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${
            category.id == idF ? "bg-orange-500" : "bg-slate-900"
          } btn-primary flex items-center gap-4`}
          onClick={() => {
            handleByCategory(category.id);
            setIdF(category.id);
          }}
        >
          <Icons icon={category.title} /> {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
