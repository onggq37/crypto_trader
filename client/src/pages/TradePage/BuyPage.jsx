import React from "react";
import { Button, Form, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";

const BuyPage = () => {
  const options = [
    { value: "limit", label: "Limit" },
    { value: "market", label: "Market" },
  ];
  return (
    <div>
      {" "}
      <Form>
        <Form.Group size="lg" controlId="email">
          Order Type
          <Select options={options} />
          {/* <Form.Control type="text" placeholder="Limit" /> */}
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Price
          <Form.Control type="text" placeholder="Price" />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Quantity
          <Form.Control type="password" placeholder="Quantity" />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            type="password"
            placeholder="Total = Price x Quantity"
          />
        </Form.Group>
        <br />
        {/* to change the route to 'api/user/wallet */}
        <Button variant="secondary" size="md" type="submit">
          BUY
        </Button>
      </Form>
    </div>
  );
};

export default BuyPage;
