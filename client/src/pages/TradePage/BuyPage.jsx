import React from "react";
import { Button, Form, Tabs, Tab } from "react-bootstrap";

const BuyPage = () => {
  return (
    <div>
      {" "}
      <Form>
        <Form.Group size="lg" controlId="email">
          Order Type
          <Form.Control type="text" placeholder="Limit" />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Price
          <Form.Control type="password" placeholder="Price" />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Quantity
          <Form.Control type="password" placeholder="Quantity" />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control type="password" placeholder="USD" />
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
