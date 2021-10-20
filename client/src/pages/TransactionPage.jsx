import React, { useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const TransferHistory = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container>
      <Row xs={1} md={1}>
        <Col>
          <Card className={`walletCard ${theme}`}>
            <Card.Img id="icon" />
            <Card.Body>
              <h1>Transaction History</h1>
              <h3>Display User's transaction history here</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order Book</th>
                    <th>Order Type</th>
                    <th>Filled Price</th>
                    <th>Filled Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>BTC</td>
                    <td>BTC/USD</td>
                    <td>Limit Sell</td>
                    <td>$1000</td>
                    <td>2 BTC</td>
                    <td>$10,000</td>
                    <td>Cancelled</td>
                  </tr>
                  <tr>
                    <td>ETH</td>
                    <td>ETH/USD</td>
                    <td>Limit Buy</td>
                    <td>$1000</td>
                    <td>30 ETH</td>
                    <td>$10,000</td>
                    <td>Filled</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransferHistory;
