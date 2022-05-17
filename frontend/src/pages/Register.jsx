import { Button, Container, Form, Col, FloatingLabel } from "react-bootstrap";
import casBulding from "../images/cas-building.png";

const Register = () => {
  return (
    <>
      <div
        className="vh-100 p-5"
        style={{
          backgroundImage: `url(${casBulding}`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Col className="p-5 mx-5">
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
        </Col>
      </div>
    </>
  );
};

export default Register;
