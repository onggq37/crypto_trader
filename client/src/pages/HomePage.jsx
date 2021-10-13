import React from "react";
import styled from "styled-components";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  grid-template-rows: auto;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 5%;
  }
`;
const Home = () => {
  return (
    <>
      <AppLayout>
        <div className="mainPage">
          <img src="images/flag.png" alt="logo" height="100px" />
          <div id="text">
            <h1>We are live in Singapore now!</h1>
            <p>Buy, sell, and store crypto on Crypto Trader</p>
            <Button size="lg" variant="info">
              <Link style={{ "text-decoration": "none" }} to="/signup">
                Sign Up Now
              </Link>
            </Button>
          </div>
        </div>
        <img
          className="App-logo"
          id="phone"
          src="images/phone_light.png"
          alt=" "
          height="600px"
        />
      </AppLayout>
      <div className="section-blue">
        <Container>
          <Row xs={1} md={3} className="g-5">
            <Col>
              <Card>
                <Card.Img id="icon" img src="images/earn.png" />
                <Card.Body>
                  <Card.Title>Grow Your Wealth</Card.Title>
                  <Card.Text>
                    Stake and earn up to 10% APY every day on your crypto
                    balance. You can grow your wealth with us so you can retire
                    early!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img id="icon" src="images/trust.png" />
                <Card.Body>
                  <Card.Title>Trust is our Priority</Card.Title>
                  <Card.Text>
                    Storing your crypto with us ensures that your assets are
                    held in our state-of-the-art storage system built by
                    world-class security engineers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img id="icon" src="images/exchange.png" />
                <Card.Body>
                  <Card.Title>Seamless Fiat-to-Crypto Exchange</Card.Title>
                  <Card.Text>
                    A high-performance crypto trading platform that delivers
                    professional-level experience, featuring advanced charting
                    and block trading.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section-white">
        <img id="logo" src="images/crypto.png" alt="logo" height="50px" />
        <img id="logo" src="images/gemini.png" alt="logo" height="40px" />
        <img id="logo" src="images/binance.png" alt="logo" height="45px" />
        <img id="logo" src="images/kucoin.png" alt="logo" height="40px" />
        <img id="logo" src="images/metamask.png" alt="logo" height="50px" />
      </div>
      <div className="section-blue" id="text">
        <h1>The most trusted crypto platform in Singapore</h1>
      </div>
      <div className="section-white">
        <Button size="lg" variant="info">
          <Link style={{ "text-decoration": "none" }} to="/signup">
            Sign Up Now
          </Link>
        </Button>
      </div>
      <div className="banner fixed-bottom"></div>
    </>
  );
};

export default Home;
