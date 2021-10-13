import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const ProductPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Login ${theme}`}>
      <h1>Our Products</h1>
    </div>
  );
};

export default ProductPage;
