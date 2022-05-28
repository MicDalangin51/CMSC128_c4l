import { useState } from "react";
import { Modal, Tabs, Tab, Form, FloatingLabel, Row, Col, Button, Stack, Alert } from "react-bootstrap";

const AddStudentModal = ({ show, closeAddStudentModal }) => {
  const [tabKey, setTabKey] = useState("");
  const [fileUploadAlertMessage, setFileUploadAlertMessage] = useState("");
  const [fillUpFormAlertMessage, setFillUpFormAlertMessage] = useState("");

  const hideModalHandler = () => {
    closeAddStudentModal();

    setFileUploadAlertMessage("");
    setFillUpFormAlertMessage("");
  };

  const submitFileHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);

    const response = await fetch("/api/students:file", {
      method: "POST",
      body: formData,
    });

    switch (response.status) {
      case 200:
        closeAddStudentModal();
        break;
      default:
        setFileUploadAlertMessage("Adding students was unsuccessful");
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const { student_id, first_name, middle_name, last_name, degree_program, college, gwa, batch } = event.target;

    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({
        student_id: student_id.value,
        first_name: first_name.value,
        middle_name: middle_name.value,
        last_name: last_name.value,
        degree_program: degree_program.value,
        college: college.value,
        gwa: parseFloat(gwa.value),
        batch: parseInt(batch.value),
      }),
    });

    switch (response.status) {
      case 200:
        closeAddStudentModal();
        break;
      default:
        setFillUpFormAlertMessage("Adding student was unsuccessful");
    }
  };

  return (
    <Modal
      show={show}
      onShow={() => setTabKey("csv")}
      onHide={hideModalHandler}
      size={tabKey == "form" && "lg"}
      backdrop={tabKey == "form" ? "static" : true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs onSelect={(key) => setTabKey(key)}>
          <Tab eventKey="csv" title="Upload CSV" className="p-4">
            <Form onSubmit={submitFileHandler}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" name="file" accept=".csv,.xls,.xlsx" required />
              </Form.Group>
              {fileUploadAlertMessage !== "" && <Alert variable="danger">{fileUploadAlertMessage}</Alert>}
              <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                  Upload
                </Button>
              </Stack>
            </Form>
          </Tab>
          <Tab eventKey="form" title="Fill up form" className="p-4">
            <Form onSubmit={submitFormHandler}>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="First name">
                    {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                    <Form.Control name="first_name" placeholder=" " required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Middle name">
                    <Form.Control name="middle_name" placeholder=" " required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Last name">
                    <Form.Control name="last_name" placeholder=" " required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Batch number">
                    <Form.Control name="batch" type="number" min="1908" max="9999" placeholder=" " required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Student number">
                    <Form.Control name="student_id" pattern="\d{4}-\d{5}" placeholder=" " required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="College">
                    <Form.Control name="college" placeholder=" " required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Degree program">
                    <Form.Control name="degree_program" placeholder=" " required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="px-2">
                  <FloatingLabel controlId="floatingInput" label="General weighted average (GWA)">
                    <Form.Control name="gwa" pattern="[12](.\d+)?|[345]" placeholder=" " required />
                  </FloatingLabel>
                </Col>
              </Row>
              {fillUpFormAlertMessage !== "" && <Alert variable="danger">{fillUpFormAlertMessage}</Alert>}
              <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                  Submit
                </Button>
              </Stack>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentModal;
