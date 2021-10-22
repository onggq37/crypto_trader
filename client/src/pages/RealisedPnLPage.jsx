import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const BalancePage = ( { realisedPnl } ) => {
  const { theme } = useContext(ThemeContext);
  const numberWithCommas = (num) => {
    if (!num) return 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const numPrecision = (num) => {
    if (!num) return 
    if (num.toFixed(2) === "0.00") {
      return num.toPrecision(2);
    } else {
      return numberWithCommas(num.toFixed(2));
    }
  };

  return (
    <>
    <div>
      <Container>
        <Row xs={1} md={1}>
          <Col>
            <Card className={`walletCard ${theme}`}>
              <Card.Body>
                <h1>Profit and Loss statement</h1>
                <h3>Summary at a glance</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Coin currency pairing</th>
                      <th>Cost per coin (USD)</th>
                      <th>Quantity</th>
                      <th>Gross sale (USD)</th>
                      <th>Initial cost (USD)</th>
                      <th>Profit and Loss</th>
                      <th>Profit and Loss(%)</th>
                    </tr>
                  </thead>

                  <tbody>
                  {realisedPnl.map((summary, index) => (
                        <tr key={index}>
                          <td><img src={summary.coinImageUrl} />{"  "}{summary.coinCurrencyPair}</td>
                          <td>{summary.individualAmount}</td>
                          <td>{summary.quantity}</td>
                          <td>{summary.grossAmount}</td>
                          <td>{numPrecision(summary.costAmount)}</td>
                          <td style = {summary.PnL > 0 ? {color: "green"} : {color: "red"}} >{numPrecision(summary.PnL)}</td>
                          <td style = {summary.percentagePnL > 0 ? {color: "green"} : {color: "red"}} >{numPrecision(summary.percentagePnL)}</td>
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
