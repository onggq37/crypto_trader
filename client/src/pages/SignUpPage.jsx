import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ThemeContext from "../ThemeContext";

const SignUpPage = ({ showErrorMsg, setShowErrorMsg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = () => {
    return name.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const result = await response.json();
    console.log(result);
    //To do: loop through the error and display it
    if (result.errors) {
      setShowErrorMsg(true);
      setMessage(result.errors[0].msg);
      // return alert(`${result.errors[0].msg}`);
    }

    if (result.token) {
      localStorage.setItem("token", result.token);
      history.push("/login"); //go to login page after signing up
    }
  };

  return (
    <div className={`Signup ${theme}`}>
      <img src={`./images/sm_logo_${theme}.png`} height="80px" alt="logo" />{" "}
      <br />
      <h2>Create Account</h2> <br />
      {showErrorMsg && <div className="fail">{message}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="email">
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <br />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </Form.Group>
        <br />
        <Button
          variant="secondary"
          size="md"
          type="submit"
          disabled={!validateForm() || password !== confirmPassword}
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
