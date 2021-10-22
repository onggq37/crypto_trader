import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";

const SellPage = ({ cryptoPrice }) => {
  const [selectedVal, setSelectedVal] = useState();
  const [limitPrice, setLimitPrice] = useState(0);
  const [limitQty, setLimitQty] = useState();
  const [mktQty, setMktQty] = useState();

  const options = [
    { value: "limit", label: "Limit" },
    { value: "market", label: "Market" },
  ];

  const selectKey = (e) => {
    setSelectedVal(e.value);
  };
  const handleLimitPrice = (e) => {
    setLimitPrice(e.target.value);
  };

  const handleMktQty = (e) => {
    setMktQty(e.target.value);
  };

  const handleLimitQty = (e) => {
    setLimitQty(e.target.value);
  };

  const handleSell = () => {
    alert("Confirm Sell Order?");
  };

  return (
    <div className="trade">
      <Form>
        <Form.Group size="lg" controlId="email">
          Order Type
          <Select
            options={options}
            value={options.find((obj) => obj.value === selectedVal)}
            onChange={selectKey}
          />
          {/* <Form.Control type="text" placeholder="Limit" /> */}
        </Form.Group>
        <br />

        {selectedVal === "limit" ? (
          <>
            <Form.Group size="lg" controlId="price">
              Price
              <Form.Control
                type="number"
                placeholder="Price"
                value={limitPrice}
                onChange={handleLimitPrice}
              />
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="quantity">
              Quantity
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={limitQty}
                onChange={handleLimitQty}
              />
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="quantity">
              Total = Selected Price x Quantity
              <Form.Control
                type="number"
                placeholder="Total"
                value={(limitPrice * limitQty).toFixed(2)}
              />
            </Form.Group>
            <br />
          </>
        ) : (
          // else use Market Price
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
        )}
        <Button
          variant="secondary"
          size="md"
          type="submit"
          onClick={handleSell}
        >
          SELL
        </Button>
      </Form>
    </div>
  );
};

export default SellPage;
