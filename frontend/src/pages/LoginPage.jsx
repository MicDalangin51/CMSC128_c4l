import React from 'react';
import './LoginPage.css';
import logo from '../images/cas-logo.png';
import {Button, Container, Form} from "react-bootstrap";

const LoginPage = () => {
    return <>
    <div className="leftHalf"></div>
    <div className="rightHalf">
        <Container className="mt-5 p-5">
            <img src={logo} width="150" height="150" className="logo"/>
            <h2>GWA Verifier</h2>
            <br/>
                <Form className="login-form">
                    <Form.Group controlId="formEmail" className="w-50">
                        <Form.Label className="input-label">Email</Form.Label>
                        <Form.Control type="email" title="Enter email"/>
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