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

const EditStudentSummaryModal = ({
  showModal,
  closeModal,
  student_num,
  requnits,
  totalunits,
  totalcumulative,
  finalgwa,
}) => {
  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { req_units, total_units, total_cumulative, GWA, justification } =
      event.target;

    const response = await fetch(`/api/students/${student_num}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: student_num,
        new_data: req_units.value,
        col_name: "req_units",
        // justification: justification.value,
      }),
    });

    const response1 = await fetch(`/api/students/${student_num}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: student_num,
        new_data: total_units.value,
        col_name: "total_units",
        // justification: justification.value,
      }),
    });

    const response2 = await fetch(`/api/students/${student_num}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        student_id: student_num,
        new_data: total_cumulative.value,
        col_name: "total_cumulative",
        // justification: justification.value,
      }),
    });

    const response3 = await fetch(`/api/students/${student_num}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        student_id: student_num,
        new_data: GWA.value,
        col_name: "GWA",
        // justification: justification.value,
      }),
    });

    switch (
      response.status &&
      response1.status &&
      response2.status &&
      response3.status
    ) {
      case 200:
        closeModal();
        location.reload();
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
              <FloatingLabel controlId="floatingInput" label="Required units">
                {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                <Form.Control
                  name="req_units"
                  pattern="\d+"
                  defaultValue={requnits}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Total units">
                <Form.Control
                  name="total_units"
                  pattern="\d+"
                  defaultValue={totalunits}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="Total cumulative">
                <Form.Control
                  name="total_cumulative"
                  pattern="\d+(.\d+)?"
                  defaultValue={totalcumulative}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col className="px-2">
              <FloatingLabel controlId="floatingInput" label="GWA">
                <Form.Control
                  name="GWA"
                  defaultValue={finalgwa}
                  pattern="[12](.\d+)?|[345]"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Justification">
              <Form.Control
                name="justification"
                placeholder=" "
                //   required
              />
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
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default EditStudentSummaryModal;
