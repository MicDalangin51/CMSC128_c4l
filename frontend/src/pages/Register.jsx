import { useState } from "react";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function register(e) {
    e.preventDefault();

    const credentials = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    fetch("api/register", {
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
          alert("Failed to register");
        }
      });
  }

  return (
    <>
      <div fluid className="background">
        <div className="leftSide"></div>
        <div className="rightSide">
          <h1 className="text-center">Add Account</h1>
          <Container className="contain" fluid="xs">
            <Form>
              <FloatingLabel label="Full Name" className="mb-3 text-black">
                <Form.Control
                  value={name}
                  placeholder=" "
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
              </FloatingLabel>

              <FloatingLabel label="Email address" className="mb-3 text-black">
                <Form.Control
                  type="email"
                  value={email}
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3 text-black">
                <Form.Control
                  type="password"
                  value={password}
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                label="Confirm Password"
                className="mb-3 text-black"
              >
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder=" "
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FloatingLabel>

              <Button onClick={register}>Save</Button>

              <a href="/settings">
                <Button className="mx-3">Cancel</Button>
              </a>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Register;
