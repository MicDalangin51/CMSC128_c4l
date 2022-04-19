import React from 'react';
import './LoginPage.css';
import {Button, Container, Form} from "react-bootstrap";

const LoginPage = () => {
    return <>
    <div className="leftHalf"></div>
    <div className="rightHalf">
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
    </div>
    </>
};

export default LoginPage;