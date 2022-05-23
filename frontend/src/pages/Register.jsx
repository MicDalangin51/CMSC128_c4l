import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  return (
    <>
      <div fluid className="background">
        <div className="leftSide"></div>
        <div className="rightSide">
          <h1 className="text-center">Add Account</h1>
          <Container className="contain" fluid="xs">
            <Form>
              <FloatingLabel label="Full Name" className="mb-3 text-black">
                <Form.Control />
              </FloatingLabel>

              <FloatingLabel label="Email address" className="mb-3 text-black">
                <Form.Control type="email" />
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3 text-black">
                <Form.Control type="password" />
              </FloatingLabel>

              <FloatingLabel
                label="Confirm Password"
                className="mb-3 text-black"
              >
                <Form.Control type="password" />
              </FloatingLabel>

              <Button className="">Save</Button>

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
