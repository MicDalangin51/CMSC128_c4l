import { useState, useEffect } from "react";
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
  FaMinus,
  FaEdit,
} from "react-icons/fa";
import { DashboardLayout, AddStudentModal } from "/src/components";

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const openAddStudentModal = () => {
    setShowAddStudentModal(true);
  };

  const closeAddStudentModal = () => {
    setShowAddStudentModal(false);
  };

  useEffect(async () => {
    const response = await fetch("/api/students");
    const data = await response.json();
    setStudents(data.students);
  }, []);

  const lowerStudentRange = 1;
  const upperStudentRange = 50;
  const studentCount = 1372;
  // Temporary variables [END] -----------------------------------------------------

  const [sortProperty, setSortProperty] = useState("name");

  // //deletes a student
  // const deleteStudent = async (student_id) => {
  //   console.log(student_id);
  //   const response = await fetch(`/api/students`, {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       student_id: student_id,
  //     }),
  //   });

  //   switch (response.status) {
  //     case 200:
  //       console.log("Student deleted");
  //       break;
  //     default:
  //       console.log("Student not deleted");
  //   }
  // };

  //deletes a student
  function deleteStudent(student_number) {
    console.log(student_number);
    const row = {
      student_number: student_number,
    };

    fetch(`/api/students`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          console.log("Successfully deleted!");
        } else {
          console.log("Failed to delete!");
        }
      });
    // location.reload();
  }

  return (
    <>
      <DashboardLayout fixedContent>
        <Stack className="h-100">
          <Row className="mb-2">
            <Col>
              <Button onClick={openAddStudentModal}>Add student</Button>
            </Col>
            <Col className="d-flex align-items-center">
              <InputGroup>
                <Button variant="outline-primary">
                  <FaSearch />
                </Button>
                <FormControl placeholder="Search student" />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
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
          <div className="flex-fill overflow-auto">
            <Table hover className="table-fixed-head">
              <thead className="sticky-top">
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map(
                  ({ name, course_name, status, student_number }, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href={`/student/${student_number}`}>{name}</a>
                        </td>
                        <td>{course_name}</td>
                        <td>
                          {status == "verified" && (
                            <Badge pill bg="success">
                              {status}
                            </Badge>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="outline-none"
                            size="sm"
                            onClick={() => deleteStudent(student_number)}
                          >
                            <FaMinus />
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </div>
        </Stack>
      </DashboardLayout>
      <AddStudentModal
        show={showAddStudentModal}
        closeAddStudentModal={closeAddStudentModal}
      />
    </>
  );
};

export default StudentDirectory;
