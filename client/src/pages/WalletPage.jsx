import React, { useState, useContext, useEffect } from "react";
import { Container, Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import { withRouter } from "react-router";
import TransactionHistoryPage from "./TransactionHistoryPage";
import TransferPage from "./TransferPage";
import RealisedPnLPage from "./RealisedPnLPage";
import BalancePage from "./BalancePage";
import ThemeContext from "../ThemeContext";
import { GiMoneyStack } from "react-icons/gi";

const WalletPage = ({ status, setStatus }) => {
  const [key, setKey] = useState("balances");
  const [balance, setBalance] = useState([])
  const [transactionHistory, setTransactionHistory] = useState([])
  const [transferHistory, setTransferHistory] = useState([])
  const [realisedPnl, setRealisedPnl] = useState([])
  const { theme } = useContext(ThemeContext);

  useEffect(async () => {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': `application/json`,
      'x-auth-token': `${token}`
    }

    let response = await fetch("/api/wallet", {headers});
    let results = await response.json();
    setBalance(results);

    response = await fetch("/api/wallet/transactionhistory", {headers});
    results = await response.json();
    setTransactionHistory(results);

    response = await fetch("/api/wallet/transferhistory", {headers});
    results = await response.json();
    setTransferHistory(results);

    response = await fetch("/api/wallet/realisedpnl", {headers});
    results = await response.json();
    setRealisedPnl(results);

  }, [])


  return (
    <div className={`walletPage ${theme}`}>
      <h1>
        Your Wallet <GiMoneyStack />
      </h1>

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
                    <TransactionHistoryPage transactionHistory = {transactionHistory} />
                  </Tab>
                  <Tab eventKey="transfer" title="Funds Transfer">
                    <TransferPage transferHistory = {transferHistory} />
                  </Tab>
                  <Tab eventKey="realisedpnl" title="Realised PnL">
                    <RealisedPnLPage realisedPnl = {realisedPnl} />
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
