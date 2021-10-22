import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import ThemeContext from "../../ThemeContext";
import BuyPage from "./BuyPage";
import CandleStickChart from "../../components/CandleStickChart";
import SellPage from "./SellPage";

const TradePage = () => {
  const { theme } = useContext(ThemeContext);
  const [key, setKey] = useState("Buy");
  return (
    <div className={`Login ${theme}`}>
      <br />
      <h3>Avaliable to Trade</h3> <br />
      <Container>
        <Row xs={1} md={2}>
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
                  <Tab eventKey="Buy" title="Buy">
                    <BuyPage />
                  </Tab>
                  <Tab eventKey="Sell" title="Sell">
                    <SellPage />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <CandleStickChart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TradePage;
