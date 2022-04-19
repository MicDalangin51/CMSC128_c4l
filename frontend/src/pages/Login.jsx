import React from 'react';
import './Login.css';
import logo from '../images/cas-logo.png';
import {Row, Col, Container, Form, Button} from "react-bootstrap";

const Login = () => {
    return <>
    <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-5">
            <Container className="p-5 m-5 shadow-sm rounded-lg bg-white"></Container>
        </Col>

        <Col>
            <Container className="mt-5 p-5">
            <img src={logo} width="150" height="150" className="logo"/>
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