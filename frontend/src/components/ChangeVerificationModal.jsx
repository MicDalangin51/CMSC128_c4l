import { Modal, Button } from "react-bootstrap";

const ChangeVerificationModal = ({
  showModal,
  closeModal,
  verifier,
  shac_member,
  student_num,
}) => {
  const handleClose = () => {
    closeModal();
  };

  //edits the student
  function editStudent() {
    const data = {
      student_id: student_num,
      new_data: shac_member,
      column: verifier,
    };

    fetch(`/api/students/${student_num}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          alert("Successfully changed!");
        } else {
          alert("Failed to change!");
        }
      });

    closeModal();
  }

  return (
    <Modal size="lg" show={showModal} centered>
      <Modal.Body>Change {verifier}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={editStudent}>
          Yes
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeVerificationModal;
