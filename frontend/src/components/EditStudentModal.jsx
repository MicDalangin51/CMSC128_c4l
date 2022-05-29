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

const EditStudentModal = ({
  showModal,
  closeModal,
  student_num,
  fullname,
  course,
}) => {
  var fullName = fullname.split(", ");

  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { first_name, last_name, degree_program } = event.target;

    const response = await fetch("/api/students", {
      method: "PATCH",
      body: JSON.stringify({
        student_id: student_num,
        new_data: first_name.value,
        column: "first_name",
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        break;
      default:
        setFillUpFormAlertMessage("Editing student was unsuccessful");
    }

    const response1 = await fetch("/api/students", {
      method: "PATCH",
      body: JSON.stringify({
        student_id: student_num,
        new_data: last_name.value,
        column: "last_name",
      }),
    });

    switch (response1.status) {
      case 200:
        closeModal();
        break;
      default:
        setFillUpFormAlertMessage("Editing student was unsuccessful");
    }

    const response2 = await fetch("/api/students", {
      method: "PATCH",
      body: JSON.stringify({
        student_id: student_num,
        new_data: degree_program.value,
        column: "degree_program",
      }),
    });

    switch (response2.status) {
      case 200:
        closeModal();
        break;
      default:
        setFillUpFormAlertMessage("Editing student was unsuccessful");
    }
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitFormHandler}>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="First name">
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                <Form.Control
                  name="first_name"
                  defaultValue={fullName[0]}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Last name">
                <Form.Control
                  name="last_name"
                  defaultValue={fullName[1]}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Degree program">
                <Form.Control
                  name="degree_program"
                  defaultValue={course}
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

export default EditStudentModal;
