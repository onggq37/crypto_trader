import React, { useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import ThemeContext from "../ThemeContext";

const TransferHistory = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container>
      <Row xs={1} md={1}>
        <Col>
          <Card className={`walletCard ${theme}`}>
            <Card.Img id="icon" />

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransferHistory;