import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import LineChart from "../components/LineChart";
import ThemeContext from "../ThemeContext";

const PriceShowPage = ({ isAuth }) => {
  const [cryptoPrice, setCryptoPrice] = useState();
  const [cryptoName, setCryptoName] = useState();
  const [priceChange, setPriceChange] = useState();
  const [description, setDescription] = useState();
  const [chartData, setChartData] = useState();
  const { theme } = useContext(ThemeContext);
  const param = useParams();
  const targetSymbol = param.symbol;
  // console.log(targetSymbol);

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
        setCryptoPrice(payload.currentPrice);
        setCryptoName(payload.name);
        setDescription(payload.description);
        setPriceChange(payload.priceChange60d);
        setChartData(payload.data90d);
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
        <Row xs={1} md={1}>
          <Col>
            <Card className={`showPricePage ${theme}`}>
              <Card.Body>
                <h2>{cryptoName}</h2>
                <h3 className="price">${cryptoPrice}</h3>
                <p
                  style={
                    crypto.changes > 0 ? { color: "green" } : { color: "red" }
                  }
                >
                  ${priceChange}
                </p>
                <LineChart chartData={chartData} coinName={cryptoName} />
                <h2>About {cryptoName}</h2>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </p>

                {isAuth ? (
                  <Button size="md" variant="secondary">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/trade/" + targetSymbol}
                    >
                      Go Trade Now!
                    </Link>
                  </Button>
                ) : (
                  <Button size="md" variant="secondary">
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                      Login to Trade
                    </Link>
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PriceShowPage;
