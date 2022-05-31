import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Alert,
  Stack,
} from "react-bootstrap";
import { useState } from "react";

const EditStudentCourseModal = ({
  showModal,
  closeModal,
  student_num,
  semester,
  course_number_param,
  grade_param,
  units_param,
  weight_param,
  cumulative_param,
}) => {
  var sem = semester[9];
  var academic_year =
    semester.substring(17, 19) + "/" + semester.substring(22, 24);

  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { course_number, grade, units, weight, cumulative } = event.target;

    const response = await fetch(
      `/api/students/${student_num}/courses/${course_number_param}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: student_num,
          col_name: "course_code",
          new_data: course_number.value,
          prev_data: course_number_param,
          semester: sem,
          acad_year: academic_year,
        }),
      }
    );

    const response1 = await fetch(
      `/api/students/${student_num}/courses/${course_number_param}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: student_num,
          col_name: "grade",
          new_data: grade.value,
          prev_data: grade_param,
          semester: sem,
          acad_year: academic_year,
        }),
      }
    );

    const response2 = await fetch(
      `/api/students/${student_num}/courses/${course_number_param}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: student_num,
          col_name: "units",
          new_data: units.value,
          prev_data: units_param,
          semester: sem,
          acad_year: academic_year,
        }),
      }
    );

    const response3 = await fetch(
      `/api/students/${student_num}/courses/${course_number_param}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: student_num,
          col_name: "weight",
          new_data: weight.value,
          prev_data: weight_param,
          semester: sem,
          acad_year: academic_year,
        }),
      }
    );

    const response4 = await fetch(
      `/api/students/${student_num}/courses/${course_number_param}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: student_num,
          col_name: "cumulative",
          new_data: cumulative.value,
          prev_data: cumulative_param,
          semester: sem,
          acad_year: academic_year,
        }),
      }
    );

    switch (
      response.status &&
      response1.status &&
      response2.status &&
      response3.status &&
      response4.status
    ) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setFillUpFormAlertMessage("Editing student data was unsuccessful");
    }
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitFormHandler}>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Course code">
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                <Form.Control
                  name="course_number"
                  defaultValue={course_number_param}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Grade">
                <Form.Control
                  name="grade"
                  pattern="^\d+$"
                  defaultValue={grade_param}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Units">
                <Form.Control
                  name="units"
                  pattern="^\d+$"
                  defaultValue={units_param}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Weight">
                <Form.Control
                  name="weight"
                  defaultValue={weight_param}
                  pattern="^\d+$"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Cumulative">
                <Form.Control
                  name="cumulative"
                  defaultValue={cumulative_param}
                  pattern="^\d+$"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          {fillUpFormAlertMessage !== "" && (
            <Alert variable="danger">{fillUpFormAlertMessage}</Alert>
          )}
          <Stack direction="horizontal">
            <Button variant="secondary" type="submit" className="ms-auto">
              Save
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default EditStudentCourseModal;
