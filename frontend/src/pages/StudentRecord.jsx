import { DashboardLayout } from "/src/components";
import { FaArrowLeft } from "react-icons/fa";
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
  //   Sample entries per semester
  var entries = {
    name: "Full name here",
    course: "BS Computer Science",
    student_number: "2019-01234",
    GWA: "2.0",
    total_units: "150",
    courses_not_taken: ["CMSC 12", "CMSC 13", "CMSC 14", "CMSC 15"],
    summary: [
      {
        id: 1,
        semester: "Semester 1- A.Y. 2015-2016",
        content: [
          {
            course_number: "ENG 1(AH)",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "6",
          },
          {
            course_number: "FIL 20",
            grade: "2.25",
            units: "3",
            weight: "6.75",
            cumulative: "12.75",
          },
          {
            course_number: "IT 1(MST)",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "18.75",
          },
          {
            course_number: "PE 1",
            grade: "2",
            units: "0",
            weight: "0",
            cumulative: "18.75",
          },
          {
            course_number: "PHLO1(SSP)",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "24",
          },
          {
            course_number: "PSY 1(SSP)",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "29.25",
          },
          {
            course_number: "SPCM 1(AH)",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "34.5",
          },
        ],
      },
      {
        id: 2,
        semester: "Semester 2- A.Y. 2015-2016",
        content: [
          {
            course_number: "ENG 2(AH)",
            grade: "1.5",
            units: "3",
            weight: "4.5",
            cumulative: "39",
          },
          {
            course_number: "HUM 1(AH)",
            grade: "1.5",
            units: "3",
            weight: "4.5",
            cumulative: "43.5",
          },
          {
            course_number: "HUM 2(AH)",
            grade: "1.5",
            units: "3",
            weight: "4.5",
            cumulative: "48",
          },
          {
            course_number: "MATH1(MST)",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "54",
          },
          {
            course_number: "MATH2(MST)",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "60",
          },
          {
            course_number: "PSY 1(SSP)",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "29.25",
          },
          {
            course_number: "SOSC1(SSP)",
            grade: "2.5",
            units: "3",
            weight: "7.5",
            cumulative: "67.5",
          },
        ],
      },
      {
        id: 3,
        semester: "Semester 1- A.Y. 2016-2017",
        content: [
          {
            course_number: "COMA 101",
            grade: "1.25",
            units: "3",
            weight: "3.75",
            cumulative: "71.25",
          },
          {
            course_number: "ENG 4",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "77.25",
          },
          {
            course_number: "JAP 10",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "82.5",
          },
          {
            course_number: "MATH 17",
            grade: "1.75",
            units: "5",
            weight: "8.75",
            cumulative: "91.25",
          },
          {
            course_number: "NASC3(MST)",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "97.25",
          },
          {
            course_number: "NSTP 1",
            grade: "1.75",
            units: "0",
            weight: "0",
            cumulative: "97.25",
          },
          {
            course_number: "SPCM 102",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "102.5",
          },
        ],
      },
      {
        id: 4,
        semester: "Semester 2- A.Y. 2016-2017",
        content: [
          {
            course_number: "COMA 104",
            grade: "1.25",
            units: "3",
            weight: "3.75",
            cumulative: "106.25",
          },
          {
            course_number: "FIL 21",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "112.25",
          },
          {
            course_number: "JAP 11",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "117.5",
          },
          {
            course_number: "MGT 101",
            grade: "1.5",
            units: "3",
            weight: "4.5",
            cumulative: "122",
          },
          {
            course_number: "SOC 130",
            grade: "2.25",
            units: "3",
            weight: "6.75",
            cumulative: "128.75",
          },
          {
            course_number: "STAT 1",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "134",
          },
        ],
      },
      {
        id: 5,
        semester: "Semester 1- A.Y. 2017-2018",
        content: [
          {
            course_number: "ENG 101",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "140",
          },
          {
            course_number: "COMA 192",
            grade: "1",
            units: "3",
            weight: "3",
            cumulative: "143",
          },
          {
            course_number: "COMA 105",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "149",
          },
          {
            course_number: "HUM 150",
            grade: "1.75",
            units: "3",
            weight: "5.25",
            cumulative: "154.25",
          },
          {
            course_number: "PE 2",
            grade: "5",
            units: "0",
            weight: "0",
            cumulative: "154.25",
          },
          {
            course_number: "PI 10(SSP)",
            grade: "2.25",
            units: "3",
            weight: "6.75",
            cumulative: "161",
          },
          {
            course_number: "THEA 107",
            grade: "1",
            units: "3",
            weight: "3",
            cumulative: "164",
          },
        ],
      },
      {
        id: 6,
        semester: "Semester 2- A.Y. 2017-2018",
        content: [
          {
            course_number: "ENG 103",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "170",
          },
          {
            course_number: "ENG 104",
            grade: "2.25",
            units: "3",
            weight: "6.75",
            cumulative: "176.75",
          },
          {
            course_number: "HUM 170",
            grade: "2",
            units: "3",
            weight: "6",
            cumulative: "182.75",
          },
        ],
      },
    ],
  };

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
                {entries.summary.map((entry) => (
                  <Accordion.Item eventKey={"" + entry.id + ""}>
                    <Accordion.Header>{entry.semester}</Accordion.Header>
                    <Accordion.Body>
                      <Table hover responsive>
                        <thead>
                          <tr className="text-secondary">
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
                    {entries.courses_not_taken.map((entry) => {
                      return <div className="text-black"> {entry} </div>;
                    })}
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
