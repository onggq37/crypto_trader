import React from "react";
import styled from "styled-components";
import "../App.css";
import { Button } from "react-bootstrap";

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-gap: 15%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 5%;
  }
`;

const Home = () => {
  return (
    <AppLayout>
      <div>
        <img src="images/flag.png" alt="logo" height="100px" />
        <div id="text">
          <h1>We are live in Singapore now!</h1>
          <p>Buy, sell, and store crypto on Crypto Trader</p>
          <Button variant="secondary">Sign up now</Button>
        </div>
      </div>
      <img
        class="App-logo"
        id="phone"
        src="images/phone_light.png"
        alt=" "
        height="600px"
      />
    </AppLayout>
  );
};

export default Home;
