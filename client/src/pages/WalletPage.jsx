import React, { useState, useContext, useEffect } from "react";
import { Container, Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import { withRouter } from "react-router";
import TransactionPage from "./TransactionPage";
import TransferPage from "./TransferPage";
import BalancePage from "./BalancePage";
import ThemeContext from "../ThemeContext";
import { GiMoneyStack } from "react-icons/gi";

const WalletPage = ({ status, setStatus }) => {
  const [key, setKey] = useState("balances");
  const [balance, setBalance] = useState([])
  const { theme } = useContext(ThemeContext);

  // useEffect(async () => {
  //   const token = localStorage.getItem('token');

  //   const response = await fetch("/api/wallet", {
  //     headers: {
  //       'Content-Type': `application/json`,
  //       'x-auth-token': `${token}`
  //     }
  //   });
  
  //   const results = await response.json();
  //   setBalance(results);
  //   console.log(results)
  // }, [])


  return (
    <div className={`walletPage ${theme}`}>
      <h1>
        Your Wallet <GiMoneyStack />
      </h1>
      <p> Notional values as of {new Date().toLocaleString()}</p>
      <Container>
        <Row xs={1} md={1}>
          <Col>
            <Card className={`walletCard ${theme}`}>
              <Card.Img id="icon" />
              <Card.Body>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="balances" title="Account Balances">
                    <BalancePage balance = {balance} />
                  </Tab>
                  <Tab eventKey="transaction" title="Transaction History">
                    <TransactionPage />
                  </Tab>
                  <Tab eventKey="transfer" title="Funds Transfer">
                    <TransferPage />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(WalletPage);
