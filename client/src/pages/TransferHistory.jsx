import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const BalancePage = ( { transferHistory } ) => {
  const { theme } = useContext(ThemeContext);

  const numberWithCommas = (num) => {
    if (!num) return 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const numPrecision = (num) => {

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
                <h1>Your Account Balances</h1>
                <h3>Summary at a glance</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Transaction type</th>
                      <th>Amount (USD) </th>
                    </tr>
                  </thead>

                  <tbody>
                  {transferHistory.map((summary, index) => (
                        <tr key={index}>
                          <td>{summary.transType}</td>
                          <td>{numPrecision(summary.amount)}</td>
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
