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
  firstname,
  lastname,
  course,
}) => {
  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { first_name, last_name, degree_program, justification } =
      event.target;

    var edited = false;
    if (first_name.value != firstname) {
      const response = await fetch(`/api/students/${student_num}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          student_id: student_num,
          new_data: first_name.value,
          col_name: "first_name",
          prev_data: firstname,
          justification: justification.value,
        }),
      });

      switch (response.status) {
        case 200:
          edited = true;
          break;
        default:
          setFillUpFormAlertMessage("Editing student was unsuccessful");
      }
    }

    if (last_name.value != lastname) {
      const response1 = await fetch(`/api/students/${student_num}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          student_id: student_num,
          new_data: last_name.value,
          prev_data: lastname,
          col_name: "last_name",
          justification: justification.value,
        }),
      });

      switch (response1.status) {
        case 200:
          edited = true;
          break;
        default:
          setFillUpFormAlertMessage("Editing student was unsuccessful");
      }
    }

    if (degree_program.value != course) {
      const response2 = await fetch(`/api/students/${student_num}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          student_id: student_num,
          new_data: degree_program.value,
          prev_data: course,
          col_name: "degree_program",
          justification: justification.value,
        }),
      });

      switch (response2.status) {
        case 200:
          edited = true;
          break;
        default:
          setFillUpFormAlertMessage("Editing student was unsuccessful");
      }
    }
    if (edited) {
      closeModal();
      location.reload();
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
                  defaultValue={firstname}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Last name">
                <Form.Control
                  name="last_name"
                  defaultValue={lastname}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Degree program">
                <Form.Select name="degree_program" value={course} required>
                  <option value="BACA">
                    Bachelor of Arts in Communication Arts
                  </option>
                  <option value="BAP">Bachelor of Arts in Philosophy</option>
                  <option value="BAS">Bachelor of Arts in Sociology</option>
                  <option value="BSAM">
                    Bachelor of Science in Applied Mathematics
                  </option>
                  <option value="BSAP">
                    Bachelor of Science in Applied Physics
                  </option>
                  <option value="BSB">Bachelor of Science in Biology</option>
                  <option value="BSC">Bachelor of Science in Chemistry</option>
                  <option value="BSCS">
                    Bachelor of Science in Computer Science
                  </option>
                  <option value="BSM">
                    Bachelor of Science in Mathematics
                  </option>
                  <option value="BSMST">
                    Bachelor of Science in Mathematics and Science Teaching
                  </option>
                  <option value="BSS">Bachelor of Science in Statistics</option>
                  <option value="BSAC">
                    Bachelor of Science in Agricultural Chemistry
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Justification">
              <Form.Control name="justification" placeholder=" " required />
            </FloatingLabel>
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

export default EditStudentModal;
