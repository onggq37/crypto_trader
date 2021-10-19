import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CenteredModals from "../components/CenteredModals";
import ThemeContext from "../ThemeContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  // To modify handleSubmit with JWT authentication
  const handleSubmit = async (e) => {
    // setShowModal(true);
    e.preventDefault();
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })

    const result = await response.json();
    console.log(result);
    //To do: loop through the error and display it
    if (result.errors) {
      return alert(`${result.errors[0].msg}`);
    }

    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    history.push("/");
  };

  return (
    <div className={`Login ${theme}`}>
      <img src={`./images/sm_logo_${theme}.png`} height="80px" alt="logo" />{" "}
      <br />
      <h2>Welcome Back</h2> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
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
        </Button>
        <CenteredModals show={showModal} onHide={() => setShowModal(false)} />
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
