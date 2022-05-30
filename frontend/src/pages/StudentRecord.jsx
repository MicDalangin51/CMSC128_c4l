import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  DashboardLayout,
  ChangeVerificationModal,
  EditStudentModal,
  EditStudentCourseModal,
  AddStudentCourseModal,
  EditStatusModal,
} from "/src/components";
import { FaArrowLeft, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import {
  Accordion,
  Table,
  Image,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
  FloatingLabel,
  Badge,
} from "react-bootstrap";
import casBuilding from "/src/images/cas-building.png";

const StudentRecord = () => {
  const { studentNumber } = useParams();

  //for editing student-data row
  const [edit_course, setCourseEdit] = useState("");
  const [edit_grade, setGradeEdit] = useState("");
  const [edit_units, setUnitsEdit] = useState("");
  const [edit_weight, setWeightEdit] = useState("");
  const [edit_cumulative, setCumulativeEdit] = useState("");
  const [edit_semester, setSemester] = useState("");

  //gets the student's data
  const [student, setStudent] = useState([]);

  useEffect(async () => {
    const response = await fetch(`/api/students/${studentNumber}`);
    const data = await response.json();
    setStudent(data.student);
    console.log("student", data.student);
  }, []);

  //deletes a row of student-data
  function deleteRow(student_number, course_number, semester) {
    const row = {
      student_number: student_number,
      course_number: course_number,
      semester: semester[9],
      academic_year:
        semester.substring(17, 19) + "/" + semester.substring(22, 24),
    };

    console.log(row);

    fetch(`/api/students/${studentNumber}/courses/${course_number}`, {
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
    location.reload();
  }

  //closes modals
  const handleCloseAll = () => {
    setSemester("");
    setCourseEdit("");
    setGradeEdit("");
    setUnitsEdit("");
    setWeightEdit("");
    setCumulativeEdit("");
    setShowStatus(false);
    setShowVerify1(false);
    setShowVerify2(false);
    setShowVerify3(false);
    setShowEditStudent(false);
    setShowAddCourse(false);
    setShowEditCourse(false);
  };

  //changing the verification
  const [showVerify1, setShowVerify1] = useState(false);
  const handleShowVerify1 = () => setShowVerify1(true);

  const [showVerify2, setShowVerify2] = useState(false);
  const handleShowVerify2 = () => setShowVerify2(true);

  const [showVerify3, setShowVerify3] = useState(false);
  const handleShowVerify3 = () => setShowVerify3(true);

  //changing the verification
  const [showEditStudent, setShowEditStudent] = useState(false);
  const handleShowEditStudent = () => setShowEditStudent(true);

  //changing the course
  const [showAddCourse, setShowAddCourse] = useState(false);
  const handleShowAddCourse = (semester) => {
    setSemester(semester);
    setShowAddCourse(true);
  };

  //editing row
  const [showEditCourse, setShowEditCourse] = useState(false);
  const handleShowEdit = (
    course_number,
    grade,
    units,
    weight,
    cumulative,
    semester
  ) => {
    setShowEditCourse(true);
    setCourseEdit(course_number);
    setGradeEdit(grade);
    setUnitsEdit(units);
    setWeightEdit(weight);
    setCumulativeEdit(cumulative);
    setSemester(semester);
  };

  //changing the status of the student to verified and unverified
  const [showStatus, setShowStatus] = useState(false);
  const handleShowStatus = () => setShowStatus(true);

  return (
    <DashboardLayout fixedContent>
      <AddStudentCourseModal
        showModal={showAddCourse}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        semester={edit_semester}
      />

      <EditStudentCourseModal
        showModal={showEditCourse}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        semester={edit_semester}
        course_number_param={edit_course}
        grade_param={edit_grade}
        units_param={edit_units}
        weight_param={edit_weight}
        cumulative_param={edit_cumulative}
      />

      {/* <EditStudentModal
        showModal={showEditStudent}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        fullname={student.name}
        course={student.course}
      /> */}

      <ChangeVerificationModal
        showModal={showVerify1}
        closeModal={handleCloseAll}
        verifier="first_verifier"
        shac_member="shac member"
        student_num={student.student_number}
      />

      <ChangeVerificationModal
        showModal={showVerify2}
        closeModal={handleCloseAll}
        verifier="second_verifier"
        shac_member="shac member"
        student_num={student.student_number}
      />

      <ChangeVerificationModal
        showModal={showVerify3}
        closeModal={handleCloseAll}
        verifier="other_verifier"
        //return from login the credentials of the shac member
        shac_member="shac member"
        student_num={student.student_number}
      />

      <EditStatusModal
        showModal={showStatus}
        closeModal={handleCloseAll}
        current_status={student.status}
        student_num={student.student_number}
      />

      <div className="overflow-auto">
        <Row xs="auto" className="m-3">
          <Col>
            <a href="/">
              <Button className="btn btn-primary bg-transparent border-0">
                <FaArrowLeft color="maroon" />
              </Button>
            </a>
          </Col>
          <Col className="flex-fill">
            <Row xs="auto" className="m-3">
              <Col>
                <Image
                  src={casBuilding}
                  width="150"
                  height="150"
                  className="me-2"
                  roundedCircle
                />
              </Col>
              <Col className="my-auto">
                <h1>{student.name}</h1>
                <div className="text-black">{student.student_number}</div>
                <div className="text-black">{student.course}</div>
              </Col>
              <Col className="my-4">
                <Button
                  variant="outline-none"
                  size="sm"
                  onClick={handleShowEditStudent}
                >
                  <FaEdit />
                </Button>
              </Col>
            </Row>
            <Row></Row>

            <Row>
              <Accordion defaultActiveKey="0" alwaysOpen>
                {student.summary?.map((entry, index) => (
                  <Accordion.Item eventKey={"" + index + ""}>
                    <Accordion.Header>{entry.semester}</Accordion.Header>
                    <Accordion.Body>
                      <Table hover responsive>
                        <thead>
                          <tr className="text-secondary">
                            <th>Course Number</th>
                            <th>Grade</th>
                            <th>Units</th>
                            <th>Weight</th>
                            <th>Cumulative</th>
                            <th>
                              <Button
                                onClick={() => {
                                  handleShowAddCourse(entry.semester);
                                }}
                                variant="outline-none"
                                size="sm"
                              >
                                <FaPlus />
                              </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.content.map(
                            (
                              {
                                course_number,
                                grade,
                                units,
                                weight,
                                cumulative,
                              },
                              index
                            ) => {
                              return (
                                <tr key={index}>
                                  <td>{course_number}</td>
                                  <td>{grade}</td>
                                  <td>{units}</td>
                                  <td>{weight}</td>
                                  <td>{cumulative}</td>

                                  <Button
                                    variant="outline-none"
                                    size="sm"
                                    onClick={() =>
                                      deleteRow(
                                        student.student_number,
                                        course_number,
                                        entry.semester
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleShowEdit(
                                        course_number,
                                        grade,
                                        units,
                                        weight,
                                        cumulative,
                                        entry.semester
                                      )
                                    }
                                    variant="outline-none"
                                    size="sm"
                                  >
                                    <FaEdit />
                                  </Button>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Row>
          </Col>

          <Col className="flex-fill m-5">
            <Row className="my-auto">
              <Col className="my-auto">First Verifier</Col>
              <Col className="my-auto">
                <Button variant="link" onClick={handleShowVerify1}>
                  {typeof student.first_verifier == "string" && (
                    <Badge pill bg="success">
                      {student.first_verifier}
                    </Badge>
                  )}
                  {student.first_verifier == null && (
                    <Badge pill bg="secondary">
                      none
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>

            <Row className="my-auto">
              <Col className="my-auto">Second Verifier</Col>
              <Col className="my-auto">
                <Button variant="link" onClick={handleShowVerify2}>
                  {typeof student.second_verifier == "string" && (
                    <Badge pill bg="success">
                      {student.second_verifier}
                    </Badge>
                  )}
                  {student.second_verifier == null && (
                    <Badge pill bg="secondary">
                      none
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>

            <Row className="my-auto">
              <Col className="my-auto">Other Verifier</Col>
              <Col className="my-auto">
                <Button variant="link" onClick={handleShowVerify3}>
                  {typeof student.other_verifier == "string" && (
                    <Badge pill bg="success">
                      {student.other_verifier}
                    </Badge>
                  )}
                  {student.other_verifier == null && (
                    <Badge pill bg="secondary">
                      none
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>
            <Row className="my-auto">
              <Col className="my-auto">Status</Col>
              <Col className="my-auto">
                <Button onClick={handleShowStatus} variant="link">
                  {student.status == "true" && (
                    <Badge pill bg="success">
                      verified
                    </Badge>
                  )}
                  {student.status == "false" && (
                    <Badge pill bg="secondary">
                      unverified
                    </Badge>
                  )}
                  {student.status == null && (
                    <Badge pill bg="secondary">
                      unverified
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>
            <Row className="my-5">
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>GWA</h6>
                      <Card.Text className="text-black">
                        {student.GWA}
                      </Card.Text>
                    </Col>
                    <Col>
                      <h6>Total Units</h6>
                      <Card.Text className="text-black">
                        {student.total_units}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h6>General Errors</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default StudentRecord;
