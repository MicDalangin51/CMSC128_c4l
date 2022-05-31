import { Modal, Button, Alert, Form } from "react-bootstrap";
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
    const response = await fetch(`/api/students/${student_num}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: student_num,
        new_data: shac_member,
        col_name: verifier,
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
        {fillUpFormAlertMessage !== "" && (
          <Alert variable="danger">{fillUpFormAlertMessage}</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={submitFormHandler}>
          <Button variant="secondary" type="submit" className="mx-3">
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeVerificationModal;
