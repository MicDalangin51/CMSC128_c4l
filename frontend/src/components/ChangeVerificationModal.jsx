import {
  Modal,
  Button,
  Alert,
  Form,
  FloatingLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";

const ChangeVerificationModal = ({
  showModal,
  closeModal,
  verifier,
  shac_member,
  student_num,
}) => {
  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const { justification } = event.target;
    const response = await fetch(`/api/students/${student_num}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: student_num,
        new_data: shac_member,
        col_name: verifier,
        justification: justification.value,
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setFillUpFormAlertMessage("Changing verification unsuccessful!");
    }
  };

  return (
    <Modal size="lg" show={showModal} centered>
      <Modal.Body>
        Confirm verification?
        <br />
        <p className="text-secondary">
          Press yes if there are no errors were detected.
        </p>
        <Form onSubmit={submitFormHandler}>
          <Row className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Justification">
              <Form.Control name="justification" placeholder=" " required />
            </FloatingLabel>
          </Row>
          {fillUpFormAlertMessage !== "" && (
            <Alert variable="danger">{fillUpFormAlertMessage}</Alert>
          )}
          <Button variant="secondary" type="submit" className="mx-3">
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeVerificationModal;
