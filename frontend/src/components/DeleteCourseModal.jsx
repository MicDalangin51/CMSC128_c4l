import { Modal, Button, Alert, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

const DeleteCourseModal = ({
  showModal,
  closeModal,
  student_num,
  student_name,
  course_code,
  semester,
}) => {
  const handleClose = () => {
    closeModal();

    setFillUpFormAlertMessage("");
  };

  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  //deletes a student
  const submitFormHandler = async (event) => {
    const { justification } = event.target;
    event.preventDefault();
    const response = await fetch(
      `/api/students/${student_num}/courses/${course_code}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          student_number: student_num,
          course_number: course_code,
          semester: semester[9],
          academic_year:
            semester.substring(17, 19) + "/" + semester.substring(22, 24),
          // justification: justification.value,
        }),
      }
    );

    switch (response.status) {
      case 200:
        console.log("Student deleted");
        location.reload();
        break;
      default:
        console.log("Student not deleted");
        setFillUpFormAlertMessage("Delete student unsuccessful!");
    }
  };

  return (
    <Modal size="lg" show={showModal} centered>
      <Modal.Body>
        Confirm delete?
        <p className="text-secondary">
          Press yes if you want to delete {student_name}'s subject {course_code}
          .
        </p>
        <Form onSubmit={submitFormHandler}>
          <Form.Group controlId="formJustify" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Justification">
              <Form.Control
                name="justification"
                placeholder=" "
                //   required
              />
            </FloatingLabel>
          </Form.Group>

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

export default DeleteCourseModal;
