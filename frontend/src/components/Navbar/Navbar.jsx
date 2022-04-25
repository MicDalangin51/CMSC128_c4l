import { Nav, Col, Row, Dropdown } from "react-bootstrap";
import "./Navbar.css";
import logo from "../../images/cas-logo.png";
import { FaUsers, FaHistory, FaCog, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <Nav
      className="d-none d-md-block bg-light navbar"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Row xs="auto">
        <Col>
          <img src={logo} className="logo-small" />
        </Col>

        <Col>
          <h4>GWA Verifier</h4>
        </Col>
      </Row>
      <hr />
      <Nav.Item>
        <Nav.Link href="/home" className="navbar-item">
          <Row xs="auto">
            <Col>
              <FaUsers />
            </Col>
            <Col>
              <p>Student Directory</p>
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/change-log" className="navbar-item">
          <Row xs="auto">
            <Col>
              <FaHistory />
            </Col>
            <Col>
              <p>Change Log</p>
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings" className="navbar-item">
          <Row xs="auto">
            <Col>
              <FaCog />
            </Col>
            <Col>
              <p>Settings</p>
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>

      <hr />
      <Nav.Item>
        <Dropdown className="fixed-bottom" drop="up">
          <Dropdown.Toggle split variant="flat" className="drop-up">
            <span>
              <FaUserCircle></FaUserCircle>
            </span>
            Account name
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/login">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
