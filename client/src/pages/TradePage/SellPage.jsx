import React from "react";
import { Button, Form, Tabs, Tab } from "react-bootstrap";

const SellPage = () => {
  return (
    <div>
      <Form>
        <Form.Group size="lg" controlId="email">
          Order Type
          <Form.Control type="text" placeholder="Email" />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Price
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          Quantity
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control type="password" placeholder="USD" />
        </Form.Group>
        <br />
        {/* to change the route to 'api/user/wallet */}
        <Button variant="secondary" size="md" type="submit">
          SELL
        </Button>
      </Form>
    </div>
  );
};

export default SellPage;
