import { useState, useEffect } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Form,
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

const rowLimit = 50;

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Degree", value: "degree" },
];

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [totalStudentCount, setTotalStudentCount] = useState(0);
  const [search, setSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [studentStartRange, setStudentStartRange] = useState(1);
  const [studentEndRange, setStudentEndRange] = useState(rowLimit);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [orderBy, setOrderBy] = useState("asc");
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const updateSearch = (e) => {
    e.preventDefault();

    setSearch(e.target.search.value);
  };

  const goToPreviousPage = () => {
    setTablePage(tablePage - 1);
  };

  const goToNextPage = () => {
    setTablePage(tablePage + 1);
  };

  const openAddStudentModal = () => {
    setShowAddStudentModal(true);
  };

  const closeAddStudentModal = () => {
    setShowAddStudentModal(false);
  };

  useEffect(async () => {
    const queries = {
      search,
      offset: studentStartRange - 1,
      limit: rowLimit,
      sort_by: sortBy,
      order: orderBy,
    };

    const response = await fetch(
      "/api/students?" + new URLSearchParams(queries)
    );
    const data = await response.json();

    setStudents(data.students);
    setTotalStudentCount(data.totalStudentCount);
  }, [search, studentStartRange, sortBy, orderBy]);

  useEffect(() => {
    setStudentStartRange((tablePage - 1) * rowLimit + 1);

    const computedStudentEndRange = tablePage * rowLimit;
    setStudentEndRange(
      computedStudentEndRange <= totalStudentCount
        ? computedStudentEndRange
        : totalStudentCount
    );
  }, [tablePage, totalStudentCount]);

  // //deletes a student
  const deleteStudent = async (student_id) => {
    console.log(student_id);
    const response = await fetch(`/api/students`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        student_number: student_id,
      }),
    });

    switch (response.status) {
      case 200:
        console.log("Student deleted");
        location.reload();
        break;
      default:
        console.log("Student not deleted");
        alert("Student not deleted");
    }
  };

  return (
    <>
      <DashboardLayout fixedContent>
        <Stack className="h-100">
          <Row className="mb-2">
            <Col>
              <Button onClick={openAddStudentModal}>Add student</Button>
            </Col>
            <Col className="d-flex align-items-center">
              <Form onSubmit={updateSearch} className="w-100">
                <InputGroup>
                  <Button type="submit" variant="outline-primary">
                    <FaSearch />
                  </Button>
                  <Form.Control name="search" placeholder="Search student" />
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col>
              <Stack direction="horizontal" gap="2">
                <span>Sort by</span>
                <InputGroup size="sm" className="w-auto">
                  <Form.Select
                    className="w-auto"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map(({ label, value }, index) => (
                      <option value={value} key={index}>
                        {label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    className="w-auto"
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Form.Select>
                </InputGroup>
              </Stack>
            </Col>
            <Col>
              <Stack
                direction="horizontal"
                gap="2"
                className="justify-content-end"
              >
                <span>
                  {`${
                    totalStudentCount &&
                    `${studentStartRange} - ${studentEndRange} of ${totalStudentCount}`
                  } students`}
                </span>
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-primary"
                    onClick={goToPreviousPage}
                    disabled={tablePage == 1}
                  >
                    <FaAngleLeft />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={goToNextPage}
                    disabled={totalStudentCount === studentEndRange}
                  >
                    <FaAngleRight />
                  </Button>
                </ButtonGroup>
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
                          {status == "true" && (
                            <Badge pill bg="success">
                              verified
                            </Badge>
                          )}
                          {status == "false" && (
                            <Badge pill bg="secondary">
                              unverified
                            </Badge>
                          )}
                          {status == null ||
                            (status == "pending" && (
                              <Badge pill bg="secondary">
                                unverified
                              </Badge>
                            ))}
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
