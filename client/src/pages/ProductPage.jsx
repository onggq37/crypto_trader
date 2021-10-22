import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Login ${theme}`}>
      <h1>Our Products</h1>

      <h4>Sign up now to experience it yourself!</h4>
      <br />
      <Button size="md" variant="secondary">
        <Link style={{ "text-decoration": "none" }} to="/signup">
          Sign Up Now
        </Link>
      </Button>
    </div>
  );
};

export default ProductPage;
