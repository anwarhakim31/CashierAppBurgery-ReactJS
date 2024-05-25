import React from "react";
import Navbar from "../Components/layout/Navbar";
import CategoryList from "../Components/layout/CategoryList";

const CashierPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <CategoryList />
        </div>
      </main>
    </>
  );
};

export default CashierPage;
