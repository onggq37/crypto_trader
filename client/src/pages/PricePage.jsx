import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../ThemeContext";
import { SiBitcoinsv } from "react-icons/si";

const Price = () => {
  const [popularCoin, setPopularCoin] = useState([]);
  const { theme } = useContext(ThemeContext);

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
              <th>Crypto Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>24h %</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          {popularCoin.map((coin, index) => (
            <tbody>
              <tr key={index}>
                <td>
                  {" "}
                  <img src={coin.image} alt={coin.name} />{" "}
                  <Link to={"/stock/" + coin.symbol}>{coin.name}</Link>
                </td>{" "}
                <td>${coin.price}</td>
                <td
                  style={
                    coin.priceChange24Hr > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  <strong>${coin.priceChange24Hr.toFixed(2)}</strong>
                </td>
                <td
                  style={
                    coin.percentPriceChange24Hr > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {coin.percentPriceChange24Hr.toFixed(2)}%
                </td>
                <td>{coin.marketCap}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Price;
