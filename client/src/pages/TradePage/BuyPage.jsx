import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const BuyPage = ({ cryptoName, cryptoPrice }) => {

  const [mktQty, setMktQty] = useState(0);
  const [message, setMessage] = useState(""); 
  const history = useHistory();
  const handleMktQty = (e) => {
    setMktQty(e.target.value);
  };


  const handleBuy = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    
    const response = await fetch("/api/wallet/buy", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`
      },
      body: JSON.stringify({
        coin: cryptoName,
        quantity: mktQty,
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
    <div className="trade">
      <Form>
          <>
            <Form.Group size="lg" controlId="price">
              Price
              <Form.Control
                type="number"
                placeholder="Price"
                value={cryptoPrice}
              />
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="quantity">
              Quantity
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={mktQty}
                onChange={handleMktQty}
              />
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="quantity">
              Total = Market Price x Quantity
              <Form.Control
                type="number"
                placeholder="Total"
                value={(cryptoPrice * mktQty).toFixed(2)}
              />
            </Form.Group>
            <br />
          </>

        <Button variant="secondary" size="md" type="submit" onClick={handleBuy}>
          BUY
        </Button>
      </Form>
    </div>
  );
};

export default BuyPage;
