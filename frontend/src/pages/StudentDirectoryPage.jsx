import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import {
  Row,
  Col,
  FormControl,
  Button,
  InputGroup,
  Dropdown,
  Form,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./StudentDirectoryPage.css";

const StudentDirectoryPage = () => {
  const students = [
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
  ];

  return (
    <>
      <Row xs="auto">
        <Col>
          <Navbar />
        </Col>
        <Col className="flex-fill student-directory">
          <Row className="search-bar">
            <InputGroup className="mb-3">
              <FormControl placeholder="Search" className="search" />
              <Button variant="outline-secondary" id="button-addon2">
                <FaSearch />
              </Button>
            </InputGroup>
          </Row>
          <Row xs="auto" className="drop-down-container">
            <Col className="sort-by">
              <span>Sort by</span>
            </Col>
            <Col className="sort-by">
              <Form.Select aria-label="Select" className="drop-btn">
                <option value="name">Name</option>
                <option value="degree">Degree</option>
              </Form.Select>
            </Col>
            <Col className="sort-by">
              <Form.Select aria-label="Ascending" className="drop-btn">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="student-details">
            <Table hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(({ name, email, status }) => {
                  return (
                    <tr>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StudentDirectoryPage;
