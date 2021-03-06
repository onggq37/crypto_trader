import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const BalancePage = ( { balance } ) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
    <div>
      <Container>
        <Row xs={1} md={1}>
          <Col>
            <Card className={`walletCard ${theme}`}>
              <Card.Body>
                <h1>Your Account Balances</h1>
                <h3>Summary at a glance</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Coin Currency Pairing</th>
                      <th>Quantity</th>
                      <th>Initial cost price</th>
                      <th>Current coin price</th>
                      <th>Profit and Loss</th>
                      <th>% profit / loss</th>
                    </tr>
                  </thead>

                  <tbody>
                  {balance.map((summary, index) => (
                        <tr key={index}>
                          <td><img src={summary.coinImageUrl} />{"  "}{summary.coinSymbol}</td>
                          <td>{summary.currentCoinsOwned}</td>
                          <td>{summary.costBase}</td>
                          <td>{summary.currentCoinPrice}</td>
                          <td style = {summary.profitAndLoss > 0 ? {color: "green"} : {color: "red"}} >{summary.profitAndLoss}</td>
                          <td style = {summary.percentage > 0 ? {color: "green"} : {color: "red"}} >{summary.percentage}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
    </>
  );
};

export default BalancePage;
