import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DashboardLayout } from "/src/components";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import {
  Accordion,
  Table,
  Image,
  Row,
  Col,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import casBuilding from "/src/images/cas-building.png";

const StudentRecord = () => {
  const { studentNumber } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(async () => {
    const response = await fetch(`/api/student/${studentNumber}`);
    const data = await response.json();
    setEntries(data.student_data);
  }, []);

  return (
    <DashboardLayout fixedContent>
      <div className="overflow-auto">
        <Row xs="auto" className="m-3">
          <Col>
            <a href="/">
              <Button className="btn btn-primary bg-transparent border-0">
                <FaArrowLeft color="maroon" />
              </Button>
            </a>
          </Col>
          <Col className="flex-fill">
            <Row xs="auto" className="m-3">
              <Col>
                <Image
                  src={casBuilding}
                  width="150"
                  height="150"
                  className="me-2"
                  roundedCircle
                />
              </Col>
              <Col className="my-auto">
                <h1>{entries.name}</h1>
                <div className="text-black">{entries.student_number}</div>
                <div className="text-black">{entries.course}</div>
              </Col>
            </Row>
            <Row></Row>

            <Row>
              <Accordion defaultActiveKey={["1"]} alwaysOpen>
                {entries.summary.map((entry, index) => (
                  <Accordion.Item eventKey={"" + index + ""}>
                    <Accordion.Header>{entry.semester}</Accordion.Header>
                    <Accordion.Body>
                      <Table hover responsive>
                        <thead>
                          <tr className="text-secondary">
                            <th>
                              <Button variant="outline-none" size="sm">
                                <FaPlus />
                              </Button>
                            </th>
                            <th>Course Number</th>
                            <th>Grade</th>
                            <th>Units</th>
                            <th>Weight</th>
                            <th>Cumulative</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.content.map(
                            (
                              {
                                course_number,
                                grade,
                                units,
                                weight,
                                cumulative,
                              },
                              index
                            ) => {
                              return (
                                <tr key={index}>
                                  <Button variant="outline-none" size="sm">
                                    <FaMinus />
                                  </Button>
                                  <td>{course_number}</td>
                                  <td>{grade}</td>
                                  <td>{units}</td>
                                  <td>{weight}</td>
                                  <td>{cumulative}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Row>
          </Col>

          <Col className="flex-fill m-5">
            <Row className="my-5 py-3"></Row>
            <Row className="my-5">
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>GWA</h6>
                      <Card.Text className="text-black">
                        {entries.GWA}
                      </Card.Text>
                    </Col>
                    <Col>
                      <h6>Total Units</h6>
                      <Card.Text className="text-black">
                        {entries.total_units}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h6>Courses not taken</h6>
                    {/* {entries.courses_not_taken.map((entry) => {
                      return <div className="text-black"> {entry} </div>;
                    })} */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default StudentRecord;
