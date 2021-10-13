import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-light bg-light">
        <Link to="/">
          <img src="./images/logo_light.png" alt="logo" />
        </Link>
        <Link to="/products">Products</Link>
        <Link to="/prices">Crypto Prices</Link>
        <Link to="/academy">Academy</Link>
        <form className="form-inline">
          <input className="form-control" type="search" placeholder="Search" />
        </form>
        <Button variant="secondary">
          <Link to="/login">Log In</Link>
        </Button>
        <Button variant="secondary">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
