import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../ThemeContext";

const BalancePage = () => {
  const [popularStock, setPopularStock] = useState([]);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const stocksURL = `https://financialmodelingprep.com/api/v3/stock/actives?apikey=01dc0027bd7c9d74f761d14c060c736f`;
    // const getPopularStocks = async () => {
    //   const res = await fetch(`${stocksURL}`);
    //   if (res.ok) {
    //     const payload = await res.json();
    //     setPopularStock(payload.mostActiveStock);
    //   }
    // };
    // getPopularStocks();
  }, []);

  return (
    <>
      <div className={`pricePage ${theme}`}>
        <h1>CryptoCurrency Prices</h1>
        <br />
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Notional balance (USD)</th>
              <th>Quantity</th>
            </tr>
          </thead>

          {popularStock.map((stock, index) => (
            <tbody>
              <tr key={index}>
                <td>
                  {" "}
                  {stock.ticker} (
                  <Link to={"/stock/" + stock.ticker}>{stock.companyName}</Link>
                  )
                </td>{" "}
                <td>{stock.price}</td>
                <td
                  style={
                    stock.changes > 0 ? { color: "green" } : { color: "red" }
                  }
                >
                  <strong>
                    {stock.changes} ({stock.changesPercentage}%)
                  </strong>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default BalancePage;
