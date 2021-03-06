import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Tab, Tabs, Button } from "react-bootstrap";
import LineChart from "../../components/LineChart";
import ThemeContext from "../../ThemeContext";
import BuyPage from "./BuyPage";
import SellPage from "./SellPage";
import TransactionPage from "../TransactionPage";

const TradePage = (props) => {
  const [key, setKey] = useState("Buy");
  const [cryptoPrice, setCryptoPrice] = useState();
  const [cryptoPriceShow, setCryptoPriceShow] = useState();
  const [cryptoName, setCryptoName] = useState();
  const [priceChange, setPriceChange] = useState();
  const [priceChangePercent, setPriceChangePercent] = useState();
  const [description, setDescription] = useState();

  const [chartData, setChartData] = useState();
  const { theme } = useContext(ThemeContext);
  const param = useParams();
  // const targetSymbol = param.symbol;
  // console.log(targetSymbol);
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const numPrecision = (num) => {
    // console.log(typeof(num));
    if (num.toFixed(2) === "0.00") {
      // console.log("here");
      return num.toPrecision(2);
    } else {
      return numberWithCommas(num.toFixed(2));
    }
  };
  // To replace with CoinGecko API
  useEffect(() => {
    const targetSymbol = param.symbol;
    // console.log(`target: ${targetSymbol}`);

    const getCoinProperties = async () => {
      const res = await fetch(`/api/prices/${targetSymbol}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const payload = await res.json();
        // setPopularCoin(payload);
        // console.log(payload);
        const valueChange =
          payload.currentPrice * (payload.priceChange60d / 100);
        setCryptoPrice(payload.currentPrice);
        setCryptoPriceShow(numPrecision(payload.currentPrice));
        setCryptoName(payload.name);
        setDescription(payload.description);
        setPriceChangePercent(numPrecision(payload.priceChange60d));
        setChartData(payload.data90d);
        setPriceChange(numPrecision(valueChange));
      } else {
        console.error("Server Error");
      }
    };

    getCoinProperties();
  }, []);

  return (
    <div className={`walletPage ${theme}`}>
      <h1>{cryptoName}</h1>
      <p> Notional prices as of {new Date().toLocaleString()}</p>
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
                  className="mb-3 trade"
                >
                  <Tab eventKey="Buy" title="Buy">
                    <BuyPage
                      cryptoName={cryptoName}
                      cryptoPrice={cryptoPrice}
                    />
                  </Tab>
                  <Tab eventKey="Sell" title="Sell">
                    <SellPage
                      cryptoName={cryptoName}
                      cryptoPrice={cryptoPrice}
                    />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
            <br />
            <Card className={`walletCard ${theme}`}>
              <Card.Img id="icon" />
              <Card.Body>
                <TransactionPage />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={`showPricePage ${theme}`}>
              <Card.Body>
                <h2>{cryptoName}</h2>
                <h3 className="price">${cryptoPriceShow}</h3>
                <p
                  style={
                    priceChangePercent > 0 ? { color: "green" } : { color: "red" }
                  }
                >
                  {priceChangePercent > 0 ? (
                    <div>
                      +${priceChange} ({priceChangePercent}%)
                    </div>
                  ) : (
                    <div>
                      -${Math.abs(priceChange)} ({priceChangePercent}%)
                    </div>
                  )}
                </p>
                <LineChart chartData={chartData} coinName={cryptoName} />
              </Card.Body>
            </Card>
            <Card className={`walletCard ${theme}`}>
              <Card.Img id="icon" />
              <Card.Body>
                <Button size="md" variant="secondary">
                  <Link style={{ textDecoration: "none" }} to={"/prices"}>
                    Back
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TradePage;
