import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import ThemeChangerButton from "./ThemeChangerButton";

const Navibar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar fixed-top navbar-light bg-light"
      >
        <Link to="/">
          <img className="mainLogo" src="./images/logo_light.png" alt="logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Link to="/products">Products</Link>
          <Link to="/prices">Crypto Prices</Link>
          <Link to="/academy">Academy</Link>
          <form className="form-inline">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
            />
          </form>
          <Button variant="secondary" id="responsive-navbar-nav">
            <Link to="/login">Log In</Link>
          </Button>
          <Button variant="secondary" id="responsive-navbar-nav">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <ThemeChangerButton />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navibar;
