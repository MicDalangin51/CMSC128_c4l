import { Modal, Button, Alert, Form } from "react-bootstrap";
import { useState } from "react";

const EditStatusModal = ({
  showModal,
  closeModal,
  current_status,
  student_num,
}) => {
  var status = current_status == "true" ? "false" : "true";

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
        new_data: status,
        col_name: "status",
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setFillUpFormAlertMessage("Changing status unsuccessful!");
    }
  };

  return (
    <Modal size="lg" show={showModal} centered>
      <Modal.Body>Change status?</Modal.Body>
      {fillUpFormAlertMessage !== "" && (
        <Alert variable="danger">{fillUpFormAlertMessage}</Alert>
      )}
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

export default EditStatusModal;
