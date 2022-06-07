import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

import {
  DashboardLayout,
  ChangeVerificationModal,
  EditStudentModal,
  EditStudentCourseModal,
  AddStudentCourseModal,
  EditStatusModal,
  AlternateAddStudentCourseModal,
  DeleteCourseModal,
  EditStudentSummaryModal,
} from "/src/components";
import { StudentPdf } from "/src/pages";
import { FaArrowLeft, FaPlus, FaEdit } from "react-icons/fa";
import { BsCalendarCheckFill, BsCalendarXFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  Accordion,
  Table,
  Image,
  Row,
  Col,
  Button,
  Card,
  Badge,
  ListGroup,
  OverlayTrigger,
  Overlay,
  Tooltip,
} from "react-bootstrap";

const StudentRecord = () => {
  const { studentNumber } = useParams();
  var currentUser = localStorage.getItem("currentUser");

  //for editing student-data row
  const [edit_course, setCourseEdit] = useState("");
  const [edit_grade, setGradeEdit] = useState("");
  const [edit_units, setUnitsEdit] = useState("");
  const [edit_weight, setWeightEdit] = useState("");
  const [edit_cumulative, setCumulativeEdit] = useState("");
  const [edit_semester, setSemester] = useState("");

  //gets the student's data
  const [student, setStudent] = useState([]);
  const [genError, setGenError] = useState([]);
  const [dataFlags, setDataFlags] = useState([]);

  useEffect(async () => {
    const response = await fetch(`/api/students/${studentNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    setStudent(data.student);
    setGenError(data.genError);
    setDataFlags(data.dataFlags);
  }, []);

  function findRow(semester, academic_year, course_number) {
    let something = dataFlags.find(
      (flag) =>
        flag.course_code == course_number &&
        flag.acad_year == academic_year &&
        flag.semester == semester
    );

    if (something == undefined) {
      return undefined;
    } else {
      return something.prev_data;
    }
  }

  function findSuggestion(semester, academic_year, course_number) {
    let something = dataFlags.find(
      (flag) =>
        flag.course_code == course_number &&
        flag.acad_year == academic_year &&
        flag.semester == semester
    );

    if (something == undefined) {
      return undefined;
    } else {
      return something.new_data;
    }
  }

  function HasError(semester, academic_year) {
    let something = dataFlags.find(
      (flag) => flag.acad_year == academic_year && flag.semester == semester
    );

    if (something == undefined) {
      return false;
    } else {
      return true;
    }
  }

  function changeColor(column, semester, acad_year, course_number) {
    const previous_data = findRow(semester, acad_year, course_number);
    let color = previous_data == column ? "#ff5252" : "white";
    return color;
  }

  function changeMessage(column, semester, acad_year, course_number) {
    const hasError = findSuggestion(semester, acad_year, course_number);
    const previous_data = findRow(semester, acad_year, course_number);
    let message =
      hasError && previous_data == column
        ? "ERROR: Please change " + column + " to " + hasError
        : column;
    return message;
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
    setShowAddCourse2(false);
    setShowDeleteCourse(false);
    setShowEditStudentSummary(false);
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

  //adding rows with semester and acad year
  const [showAddCourse2, setShowAddCourse2] = useState(false);
  const handleShowAddCourse2 = () => setShowAddCourse2(true);

  //deleting rows
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const handleShowDeleteCourse = (course_number, semester) => {
    setShowDeleteCourse(true);
    setCourseEdit(course_number);
    setSemester(semester);
  };

  //adding rows with semester and acad year
  const [showEditStudentSummary, setShowEditStudentSummary] = useState(false);
  const handleShowEditStudentSummary = () => setShowEditStudentSummary(true);

  const studentPdfRef = useRef();

  return (
    <DashboardLayout>
      <EditStudentSummaryModal
        showModal={showEditStudentSummary}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        requnits={student.req_units}
        totalunits={student.total_units}
        totalcumulative={student.total_cumulative}
        finalgwa={student.GWA}
      />

      <DeleteCourseModal
        showModal={showDeleteCourse}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        student_name={student.last_name}
        course_code={edit_course}
        semester={edit_semester}
      />

      <AlternateAddStudentCourseModal
        showModal={showAddCourse2}
        closeModal={handleCloseAll}
        student_num={student.student_number}
      />

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

      <EditStudentModal
        showModal={showEditStudent}
        closeModal={handleCloseAll}
        student_num={student.student_number}
        firstname={student.first_name}
        lastname={student.last_name}
        course={student.course}
      />

      <ChangeVerificationModal
        showModal={showVerify1}
        closeModal={handleCloseAll}
        verifier="first_verifier"
        shac_member={currentUser}
        student_num={student.student_number}
      />

      <ChangeVerificationModal
        showModal={showVerify2}
        closeModal={handleCloseAll}
        verifier="second_verifier"
        shac_member={currentUser}
        student_num={student.student_number}
      />

      <ChangeVerificationModal
        showModal={showVerify3}
        closeModal={handleCloseAll}
        verifier="other_verifier"
        //return from login the credentials of the shac member
        shac_member={currentUser}
        student_num={student.student_number}
      />

      <EditStatusModal
        showModal={showStatus}
        closeModal={handleCloseAll}
        current_status={student.status}
        student_num={student.student_number}
      />

      <Row xs="auto" className="m-3">
        <Col>
          <a href="/">
            <Button className="btn btn-primary bg-transparent border-0">
              <FaArrowLeft color="maroon" />
            </Button>
          </a>
        </Col>
        <Col className="flex-fill">
          <Row xs="auto" className="m-3 mb-4">
            <Col className="my-auto">
              <h1>
                {student.last_name}, {student.first_name}
              </h1>
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

          <Row>
            {
              <Accordion defaultActiveKey={"0"} alwaysOpen>
                {student.summary?.map((entry, index) => {
                  var semester = entry.semester[9];
                  var acad_year =
                    entry.semester.substring(17, 19) +
                    "/" +
                    entry.semester.substring(22, 24);

                  return (
                    <Accordion.Item eventKey={"" + index + ""}>
                      <Accordion.Header>
                        {HasError(semester, acad_year) == true && (
                          <BsCalendarXFill
                            className="mx-3"
                            style={{ color: "red" }}
                          />
                        )}
                        {HasError(semester, acad_year) == false && (
                          <BsCalendarCheckFill className="mx-3" />
                        )}
                        {entry.semester}
                      </Accordion.Header>

                      <Accordion.Body>
                        <Table hover responsive>
                          <thead>
                            <tr className="text-secondary">
                              <th>Course Code</th>
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
                                  Add Course
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
                                var semester = entry.semester[9];
                                var acad_year =
                                  entry.semester.substring(17, 19) +
                                  "/" +
                                  entry.semester.substring(22, 24);

                                return (
                                  <tr key={index}>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={
                                        <Tooltip>
                                          {changeMessage(
                                            course_number,
                                            semester,
                                            acad_year,
                                            course_number
                                          )}
                                        </Tooltip>
                                      }
                                    >
                                      <td
                                        style={{
                                          backgroundColor: changeColor(
                                            course_number,
                                            semester,
                                            acad_year,
                                            course_number
                                          ),
                                        }}
                                      >
                                        {course_number}
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={
                                        <Tooltip>
                                          {changeMessage(
                                            grade,
                                            semester,
                                            acad_year,
                                            course_number
                                          )}
                                        </Tooltip>
                                      }
                                    >
                                      <td
                                        style={{
                                          backgroundColor: changeColor(
                                            grade,
                                            semester,
                                            acad_year,
                                            course_number
                                          ),
                                        }}
                                      >
                                        {grade}
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={
                                        <Tooltip>
                                          {changeMessage(
                                            units,
                                            semester,
                                            acad_year,
                                            course_number
                                          )}
                                        </Tooltip>
                                      }
                                    >
                                      <td
                                        style={{
                                          backgroundColor: changeColor(
                                            units,
                                            semester,
                                            acad_year,
                                            course_number
                                          ),
                                        }}
                                      >
                                        {units}
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={
                                        <Tooltip>
                                          {changeMessage(
                                            weight,
                                            semester,
                                            acad_year,
                                            course_number
                                          )}
                                        </Tooltip>
                                      }
                                    >
                                      <td
                                        style={{
                                          backgroundColor: changeColor(
                                            weight,
                                            semester,
                                            acad_year,
                                            course_number
                                          ),
                                        }}
                                      >
                                        {weight}
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={
                                        <Tooltip>
                                          {changeMessage(
                                            cumulative,
                                            semester,
                                            acad_year,
                                            course_number
                                          )}
                                        </Tooltip>
                                      }
                                    >
                                      <td
                                        style={{
                                          backgroundColor: changeColor(
                                            cumulative,
                                            semester,
                                            acad_year,
                                            course_number
                                          ),
                                        }}
                                      >
                                        {cumulative}
                                      </td>
                                    </OverlayTrigger>

                                    <Button
                                      variant="outline-none"
                                      size="sm"
                                      onClick={() =>
                                        handleShowDeleteCourse(
                                          course_number,
                                          entry.semester
                                        )
                                      }
                                    >
                                      <RiDeleteBin2Fill />
                                      Delete
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
                                      Edit
                                    </Button>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            }
          </Row>
        </Col>

        <Col className="flex-fill m-5">
          <Row className="my-2">
            <Button variant="primary" onClick={handleShowAddCourse2}>
              Add Course
            </Button>
          </Row>
          <Row>
            <ReactToPrint
              trigger={() => <Button variant="outline-primary">Print</Button>}
              content={() => studentPdfRef.current}
            />
            <div className="d-none">
              <StudentPdf ref={studentPdfRef} />
            </div>
          </Row>
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
                <Button
                  variant="outline-none"
                  size="sm"
                  onClick={handleShowEditStudentSummary}
                >
                  <FaEdit />
                </Button>

                <Row className="my-3">
                  <Col>
                    <h6>Required Units</h6>
                    <Card.Text className="text-black">
                      {student.req_units}
                    </Card.Text>
                  </Col>
                  <Col>
                    <h6>Total Units</h6>
                    <Card.Text className="text-black">
                      {student.total_units}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <h6>GWA</h6>
                    <Card.Text className="text-black">{student.GWA}</Card.Text>
                  </Col>
                  <Col>
                    <h6>Total Cumulative</h6>
                    <Card.Text className="text-black">
                      {student.total_cumulative}
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
                  {genError?.map(({ flags }, index) => (
                    <ListGroup key={index}>{flags}</ListGroup>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default StudentRecord;
