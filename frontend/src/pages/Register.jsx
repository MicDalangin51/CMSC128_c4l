import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  return (
    <>
      <div fluid className="background">
        <div className="leftSide"></div>
        <div className="rightSide">
          <Container
            className="m-5 p-5 rounded mb-0"
            fluid="xs"
            style={{
              backgroundColor: "#01573F",
            }}
          >
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

              <a href="/settings">
                <Button
                  className="my-3 float-end"
                  style={{
                    backgroundColor: "maroon",
                  }}
                >
                  Cancel
                </Button>
              </a>

              <Button
                className="m-3 float-end"
                style={{
                  backgroundColor: "maroon",
                }}
              >
                Add Account
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Register;
