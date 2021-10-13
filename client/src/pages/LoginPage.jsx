import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/wallet");
  };

  return (
    <div className="Login">
      <img src="./images/sm_logo_light.png" height="80px" alt="logo" /> <br />
      <h2>Welcome Back</h2> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Control
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={handleUsername}
          />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <br />
        {/* to change the route to 'api/user/wallet */}
        <Button
          variant="secondary"
          size="md"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>{" "}
        <h6 onClick={() => history.push("/forgot-password")}>
          Forgot your password?
        </h6>
        <hr />
        <Button variant="info" onClick={() => history.push("/signup")}>
          No account? Sign Up Here
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
