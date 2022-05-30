import { useState } from "react";
import {
  Modal,
  Tabs,
  Tab,
  Form,
  FloatingLabel,
  Button,
  Stack,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EditShacModal = ({
  showModal,
  closeModal,
  facultyid,
  current_staffname,
}) => {
  const [tabKey, setTabKey] = useState("");
  const [nameChangeAlertMessage, setnameChangeAlertMessage] = useState("");
  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const hideModalHandler = () => {
    closeModal();

    setnameChangeAlertMessage("");
    setFillUpFormAlertMessage("");
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const submitNameEditHandler = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    //patch request for edit faculty
    const response = await fetch(`/api/users/${facultyid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        faculty_id: facultyid,
        name: name.value,
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setnameChangeAlertMessage("Editing SHAC member's name failed");
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const { old_pw, new_pw } = event.target;
    //patch request for edit faculty

    const response = await fetch(`/api/users/${facultyid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        faculty_id: facultyid,
        old_pw: old_pw.value,
        new_pw: new_pw.value,
      }),
    });

    switch (response.status) {
      case 200:
        closeModal();
        location.reload();
        break;
      default:
        setFillUpFormAlertMessage("Editing SHAC member's password failed");
    }
  };

  return (
    <Modal
      show={showModal}
      onShow={() => setTabKey("name")}
      onHide={hideModalHandler}
      size={tabKey == "pass" && "lg"}
      backdrop={tabKey == "pass" ? "static" : true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit SHAC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs onSelect={(key) => setTabKey(key)}>
          <Tab eventKey="name" title="Change Name" className="p-4">
            <Form onSubmit={submitNameEditHandler}>
              <Form.Group controlId="formName" className="mb-3">
                <FloatingLabel controlId="floatingInput" label="Name">
                  <Form.Control
                    name="name"
                    defaultValue={current_staffname}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              {nameChangeAlertMessage !== "" && (
                <Alert variable="danger">{nameChangeAlertMessage}</Alert>
              )}
              <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                  Save
                </Button>
              </Stack>
            </Form>
          </Tab>
          <Tab eventKey="pass" title="Change password" className="p-4">
            <Form onSubmit={submitFormHandler}>
              <FloatingLabel controlId="floatingInput" label="Old password">
                <Form.Control
                  name="old_pw"
                  type="password"
                  placeholder=" "
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="New password">
                <Form.Control
                  name="new_pw"
                  type="password"
                  placeholder=" "
                  required
                />
              </FloatingLabel>
              {fillUpFormAlertMessage !== "" && (
                <Alert variable="danger">{fillUpFormAlertMessage}</Alert>
              )}
              <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                  Save
                </Button>
              </Stack>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default EditShacModal;
