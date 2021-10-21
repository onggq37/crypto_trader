import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const BalancePage = () => {
  const [userSummary, setUserSummary] = useState([]);
  const { theme } = useContext(ThemeContext);

  // To replace with CoinGecko API
  useEffect(() => {
    const getUserSummary = async () => {
      const res = await fetch("/api/wallet", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const payload = await res.json();
        setUserSummary(payload);
      } else {
        console.error("Server Error");
      }
    };
    getUserSummary();
  }, []);

  
  return (
    <>
    <div>
      <Container>
        <Row xs={1} md={1}>
          <Col>
            <Card className={`walletCard ${theme}`}>
              <Card.Body>
                <h1>(Name) Account Balances</h1>
                <h3>Summary at a glance</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Coin Currency Pairing</th>
                      <th>Quantity</th>
                      <th>Previous price bought</th>
                      <th>Current coin price</th>
                      <th>Profit and Loss</th>
                      <th>% profit / loss</th>
                    </tr>
                  </thead>

                  <tbody>
                       {userSummary.map((summary, index) => (
              <tr key={index}>
                  <td>{summary.coinSymbol}</td>
                  <td>{summary.currentCoinsOwned}</td>
                  <td>{summary.costBase}</td>
                  <td>{summary.currentCoinPrice}</td>
                  <td>{summary.profitAndLoss}</td>
                  <td>{summary.percentage}</td>
              </tr>
              ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Row xs={1} md={2} lg={2}>
          <Col>
            <DonutChart />
          </Col>
          <Col>
            <BarChart />
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default BalancePage;
