import React from 'react';
import './Login.css';
import logo from '../images/cas-logo.png';
import {Row, Col, Container, Form, Button} from "react-bootstrap";

const Login = () => {
    return <>
    <Row className="mt-5">
        <Col lg={1}></Col>
        <Col lg={5} md={6} sm={12} className="p-5 m-auto">
            <Container className="p-5 mt-5 shadow-sm rounded-lg bg-white text-dark bg-opacity-50">
                <h4>Privacy Notice</h4>
                <p>privacy notice details will be placed here<br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nulla quis est metus. Vestibulum a libero vitae est eleifend convallis vel ut justo. 
                Pellentesque in augue molestie, sollicitudin elit accumsan, luctus purus. Donec ut fringilla nisl. 
                Praesent vitae tincidunt justo. Cras ullamcorper, 
                erat quis bibendum euismod, nisl velit tincidunt arcu, accumsan efficitur ipsum quam eu lectus. 
                Sed id dignissim enim. Praesent dolor sapien, bibendum eget auctor vitae, placerat id elit. 
                Etiam ultrices ultrices sapien, a iaculis dui sagittis nec. Phasellus mi est, accumsan vel euismod at, semper quis sapien. 
                Nulla arcu nisi, rhoncus at commodo in, porttitor nec arcu. Donec nisl sapien, tempus at dapibus sed, hendrerit eget turpis. 
                Ut lobortis semper elementum. Nulla facilisi.</p>
            </Container>
        </Col>

        <Col>
            <Container className="mt-5 p-5">
            <img src={logo} width="150" height="150" className="logo"/>
            <br/>
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
        </Col>
    </Row>
    </>;
  };

export default Login;