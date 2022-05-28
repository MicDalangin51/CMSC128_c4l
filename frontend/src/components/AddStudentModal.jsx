import { useState } from "react";
import { Modal, Tabs, Tab, Form, FloatingLabel, Row, Col, Button, Stack, Alert } from "react-bootstrap";

const AddStudentModal = ({ show, closeAddStudentModal }) => {
  const [tabKey, setTabKey] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
        setAlertMessage("Adding students was unsuccessful");
    }
  };

  return (
    <Modal
      show={show}
      onShow={() => setTabKey("csv")}
      onHide={closeAddStudentModal}
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
              {alertMessage !== "" && <Alert variable="danger">{alertMessage}</Alert>}
              <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                  Upload
                </Button>
              </Stack>
            </Form>
          </Tab>
          <Tab eventKey="form" title="Fill up form" className="p-4">
            <Form>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="First name">
                    {/* placeholder is set to any non-empty string for FloatingLabel to work */}
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Middle name">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Last name">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Batch number">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Student number">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="College">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
                <Col className="px-2">
                  <FloatingLabel controlId="floatingInput" label="Degree program">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="px-2">
                  <FloatingLabel controlId="floatingInput" label="General weighted average (GWA)">
                    <Form.Control placeholder="temp" required />
                  </FloatingLabel>
                </Col>
              </Row>
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
