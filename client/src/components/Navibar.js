import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import ThemeChangerButton from "./ThemeChangerButton";
import ThemeContext from "../ThemeContext";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

const Navibar = ({
  status,
  setStatus,
  setIsAuth,
  btnDisable,
  setBtnDisable,
  isAuth
}) => {
  const { theme } = useContext(ThemeContext);

  const handleLogOut = () => {
    setStatus("Log In");
    setIsAuth(false);
    setBtnDisable(false);
    localStorage.removeItem("token");
  };

  console.log(isAuth)
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`navbar fixed-top navbar-${theme} bg-${theme}`}
      >
        <Link to="/">
          <img
            className="mainLogo"
            src={`./images/logo_${theme}.png`}
            alt="logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Link className={`${theme}`} to="/products">
            Products
          </Link> */}
          <Link className={`${theme}`} to="/prices">
            Crypto Prices
          </Link>
          <Link className={`${theme}`} to="/academy">
            Academy
          </Link>
          <Link className={`${theme}`} to="/wallet">
            Wallet
          </Link>
          <ThemeChangerButton />
          {/* <form className="form-inline">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
            />
          </form> */}

          {
            isAuth ? (
              <Button variant="secondary" id="responsive-navbar-nav">
                  Logout
            </Button>
            ) : (

              <>
              <Button variant="secondary" id="responsive-navbar-nav">
                Login
            </Button>

            <Button
              variant="secondary"
              id="responsive-navbar-nav"
              disabled={btnDisable}
            >
              <Link className={`${theme}`} to="/signup">
                Sign Up <FaUserPlus />
              </Link>
            </Button>
            </>
            )
          }


        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navibar;
