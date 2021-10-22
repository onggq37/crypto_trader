import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";
import { useHistory } from "react-router-dom";


const BalancePage = ( { transactionHistory } ) => {
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
                <h1>Transaction History</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Coin Currency Pairing</th>
                      <th>Transaction Type</th>
                      <th>Individual amount (USD)</th>
                      <th>Quantity</th>
                      <th>Gross Amount (USD)</th>
                    </tr>
                  </thead>

                  <tbody>
                  {transactionHistory.map((summary, index) => (
                        <tr key={index}>
                          <td>{summary.coinCurrencyPair}</td>
                          <td>{summary.transType}</td>
                          <td>{numPrecision(summary.individualAmount)}</td>
                          <td>{summary.quantity}</td>
                          <td>{numPrecision(summary.grossAmount)}</td>
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
