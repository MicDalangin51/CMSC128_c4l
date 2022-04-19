import React from 'react';
import './Login.css';
import {Row, Col, Container} from "react-bootstrap";

const Login = () => {
    return <>
    <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-5">
            <Container className="p-5 m-5 shadow-sm rounded-lg"></Container>
        </Col>
    </Row>
    </>;
  };

export default Login;