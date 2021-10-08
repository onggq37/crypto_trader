import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar fixed-top navbar-light bg-light">
        <Link to="/">
          <img src="./images/logo_light.png" alt="logo" />
        </Link>
        <Link to="/products">Products</Link>
        <Link to="/prices">Crypto Prices</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/academy">Academy</Link>
        <form class="form-inline">
          <input class="form-control" type="search" placeholder="Search" />
        </form>
        <Button variant="secondary">
          <Link to="/login">Log In</Link>
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
