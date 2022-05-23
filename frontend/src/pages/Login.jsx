import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import logo from "../images/cas-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  function login(e) {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          setIsAuthenticated(true);
        } else {
          alert("Failed to log in");
        }
      });
  }

  return (
    <>
      <div className="leftHalf"></div>
      <div className="rightHalf">
        <Container className="mt-5 p-5">
          <img src={logo} width="150" height="150" className="logo" />
          <h2>GWA Verifier</h2>
          <br />
          <Form onSubmit={login} className="login-form">
            <Form.Group controlId="formEmail" className="w-50">
              <Form.Label className="input-label">Email</Form.Label>
              <Form.Control
                type="email"
                title="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword" className="w-50">
              <Form.Label className="input-label">Password</Form.Label>
              <Form.Control
                type="password"
                title="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <br />
            <Button
              variant="outline-light w-50"
              type="submit"
              className="login-button"
            >
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
