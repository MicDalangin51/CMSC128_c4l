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

const AddStudentCourseModal = ({
  showModal,
  closeModal,
  student_num,
  semester,
}) => {
  var sem =
    semester[9] == 1
      ? "I/" + semester.substring(17, 19) + "/" + semester.substring(22, 24)
      : "IL/" + semester.substring(17, 19) + "/" + semester.substring(22, 24);

  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { course_number, grade, units, weight, cumulative } = event.target;

    const response = await fetch(`/api/students/${student_num}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        student_number: student_num,
        course_number: course_number.value,
        grade: grade.value,
        units: units.value,
        weight: weight.value,
        cumulative: cumulative.value,
        semester: sem,
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setFillUpFormAlertMessage("Adding student data was unsuccessful");
    }
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitFormHandler}>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Course code">
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                <Form.Control name="course_number" placeholder=" " required />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Grade">
                <Form.Control
                  name="grade"
                  pattern="[12](.\d+)?|[345]"
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Units">
                <Form.Control
                  name="units"
                  pattern="\d+"
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Weight">
                <Form.Control
                  name="weight"
                  placeholder=" "
                  pattern="\d+(.\d+)?"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Cumulative">
                <Form.Control
                  name="cumulative"
                  placeholder=" "
                  pattern="\d+(.\d+)?"
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
    </Modal>
  );
};

export default AddStudentCourseModal;
