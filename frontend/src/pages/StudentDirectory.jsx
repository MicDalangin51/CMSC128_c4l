import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { DashboardLayout } from "/src/components";

const StudentDirectory = () => {
  // Temporary variables
  let students = [
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

  for (let i = 0; i < 3; i++) students = [...students, ...students];

  const lowerStudentRange = 1;
  const upperStudentRange = 50;
  const studentCount = 1372;
  // Temporary variables [END] -----------------------------------------------------

  const [sortProperty, setSortProperty] = useState("name");

  return (
    <DashboardLayout fixedContent>
      <Stack className="h-100">
        <Row className="mb-2">
          <Col className="d-flex align-items-center">
            <InputGroup>
              <Button variant="outline-primary">
                <FaSearch />
              </Button>
              <FormControl placeholder="Search student" />
            </InputGroup>
          </Col>
          <Col>
            <Stack
              direction="horizontal"
              gap="2"
              className="justify-content-end align-items-center"
            >
              <small>
                {lowerStudentRange} – {upperStudentRange} of {studentCount}
                students
              </small>
              <Button variant="outline-primary">
                <FaAngleLeft />
              </Button>
              <Button variant="outline-primary">
                <FaAngleRight />
              </Button>
            </Stack>
          </Col>
        </Row>
        <Stack direction="horizontal" gap="2" className="mb-2">
          <span>Sort by</span>
          <Form.Select className="w-auto">
            <option value="name">Name</option>
            <option value="degree">Degree</option>
          </Form.Select>
          <Form.Select className="w-auto">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Stack>
        <div className="flex-fill overflow-auto">
          <Table hover className="table-fixed-head">
            <thead className="sticky-top">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(({ name, email, status }, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Button variant="outline-primary" size="sm">
                        <FaPlus />
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaMinus />
                      </Button>
                    </td>
                    <td>
                      <a href="/student-record">{name}</a>
                    </td>
                    <td>{email}</td>
                    <td>
                      {status == "Verified" && (
                        <Badge pill bg="success">
                          {status}
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Stack>
    </DashboardLayout>
  );
};

export default StudentDirectory;
