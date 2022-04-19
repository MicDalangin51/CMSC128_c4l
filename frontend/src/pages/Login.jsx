import React from 'react';
import './Login.css';
import {Row, Col, Container, Form, Button} from "react-bootstrap";

const Login = () => {
    return <>
    <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-5">
            <Container className="p-5 m-5 shadow-sm rounded-lg"></Container>
        </Col>

        <Col>
            <Container className="mt-5 p-5">
                <Form className="login-form">
                    <Form.Group controlId="formUsername" className="w-50">
                        <Form.Label className="input-label">Username</Form.Label>
                        <Form.Control title="Enter username"/>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formPassword" className="w-50">
                        <Form.Label className="input-label">Password</Form.Label>
                        <Form.Control type="password" title="Enter password"/>
                    </Form.Group>

                    <br/>
                    <Button variant="outline-light w-50" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </Container>
        </Col>
    </Row>
    </>;
  };

export default Login;