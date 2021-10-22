import React, { memo, useContext, useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
import ThemeContext from "../ThemeContext";
import { useHistory } from "react-router-dom";

const Deposit = memo(() => {
  const { theme } = useContext(ThemeContext);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [message, setMessage] = useState(""); 
  const history = useHistory();

  const handleTopUpAmount = (e) => {
    setTopUpAmount(e.target.value);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    const response = await fetch("/api/wallet/topup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`
      },
      body: JSON.stringify({
        amount: topUpAmount,
      }),
    });

    const result = await response.json();
    console.log(result)
    //To do: loop through the error and display it
    if (!result.success) {
      setMessage(result.message);
      return alert(`${result.message}`);
    } else {
      history.push("/prices");
      setMessage(result.message)
      return alert(`${result.message}`);
    }
  };
  return (
    <>
      <h2 className="transferTitle">Deposit Funds</h2>
      <br />
      <Row xs={1} md={1}>
        <Col>
          <Card className={`walletCard ${theme}`}>
            <Card.Img id="icon" />
            <Card.Body className="transferFunds">
              <h4>1: Enter Amount</h4>
              <Form onSubmit={handleDeposit}>
                <Form.Group size="lg">
                  <Form.Control type="number" placeholder="Amount" onChange={handleTopUpAmount}/>
                </Form.Group>
                <br />
                <Button variant="secondary" size="md" type="submit">
                  Confirm
                </Button>
              </Form>
              <br />
              <hr />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default Deposit;
