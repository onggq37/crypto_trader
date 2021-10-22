import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../ThemeContext";
import { SiBitcoinsv } from "react-icons/si";
import { Button } from "react-bootstrap";

const Price = ({ isAuth }) => {
  const [popularCoin, setPopularCoin] = useState([]);
  const { theme } = useContext(ThemeContext);

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // To replace with CoinGecko API
  useEffect(() => {
    const getPopularCoins = async () => {
      const res = await fetch("/api/prices", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const payload = await res.json();
        setPopularCoin(payload);
      } else {
        console.error("Server Error");
      }
    };
    getPopularCoins();
  }, []);

  const numPrecision = (num) => {
    console.log(num.toFixed(2));
    if (num.toFixed(2) === "0.00") {
      console.log("here");
      return num.toPrecision(2);
    } else {
      return numberWithCommas(num.toFixed(2));
    }
  };

  return (
    <>
      <div className={`pricePage ${theme}`}>
        <h1>
          CryptoCurrency Prices <SiBitcoinsv />
        </h1>
        <br />
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Crypto Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>24h %</th>
              <th>Market Cap</th>
              <th>Trade Now</th>
            </tr>
          </thead>

          {popularCoin.map((coin, index) => (
            <tbody>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {" "}
                  <img src={coin.image} alt={coin.name} />{" "}
                  <Link to={"/price/" + coin.id}>{coin.name}</Link>
                </td>{" "}
                <td>${numPrecision(coin.price)}</td>
                <td
                  style={
                    coin.priceChange24Hr > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  <strong>${numPrecision(coin.priceChange24Hr)}</strong>
                </td>
                <td
                  style={
                    coin.percentPriceChange24Hr > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  <strong>{numPrecision(coin.percentPriceChange24Hr)}%</strong>
                </td>
                <td>{numberWithCommas(coin.marketCap)}</td>
                <td>
                  {isAuth ? (
                    <Button size="md" variant="secondary">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/trade/" + coin.id}
                      >
                        Buy / Sell
                      </Link>
                    </Button>
                  ) : (
                    <Button size="md" variant="secondary">
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Trade
                      </Link>
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Price;
