import { useState } from "react";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { name, email, department, access_level, password, confirmpass } =
      event.target;

    console.log(access_level.value);
    if (password.value === confirmpass.value) {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          department: department.value,
          access_level: access_level.value,
        }),
      });

      switch (response.status) {
        case 200:
          location.reload();
          break;
        default:
          console.log("error");
      }
    } else {
      console.log("password is not a match");
    }
  };

  return (
    <>
      <div fluid className="background">
        <div className="leftSide"></div>
        <div className="rightSide">
          <h1 className="text-center">Add Account</h1>
          <Container className="contain" fluid="xs">
            <Form onSubmit={submitFormHandler}>
              <FloatingLabel label="Full Name" className="mb-3 text-black">
                <Form.Control placeholder=" " name="name" required />
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
              </FloatingLabel>

              <FloatingLabel label="Email address" className="mb-3 text-black">
                <Form.Control
                  type="email"
                  placeholder=" "
                  name="email"
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="Department" className="mb-3 text-black">
                <Form.Control placeholder=" " name="department" required />
              </FloatingLabel>

              <FloatingLabel label="Access Level" className="mb-3 text-black">
                <Form.Select name="access_level" required>
                  <option>Staff</option>
                  <option>Admin</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3 text-black">
                <Form.Control
                  type="password"
                  placeholder=" "
                  name="password"
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                label="Confirm Password"
                className="mb-3 text-black"
              >
                <Form.Control
                  type="password"
                  placeholder=" "
                  name="confirmpass"
                  required
                />
              </FloatingLabel>

              <Button type="submit">Save</Button>

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
