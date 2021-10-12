import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {
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
    alert(`Welcome ${username}, You are signed up!`);
    history.push("/login"); //go to login page after signing up
  };

  return (
    <div className="Login">
      <img src="./images/sm_logo_light.png" height="80px" alt="logo" /> <br />
      <h2>Create Account</h2> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Control
            type="text"
            placeholder="Username"
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
        <Button
          variant="secondary"
          size="md"
          type="submit"
          disabled={!validateForm()}
        >
          Sign Up
        </Button>{" "}
        <hr />
        <Button variant="info" onClick={() => history.push("/login")}>
          Already have an account? Log In
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;
