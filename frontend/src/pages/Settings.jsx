import {
  Row,
  Stack,
  Image,
  Container,
  Col,
  Tabs,
  Tab,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { FaEdit, FaPlus, FaMinus } from "react-icons/fa";

import { DashboardLayout } from "/src/components";

const Settings = () => {
  // Temporary variables
  var student = {
    name: "Juan dela Cruz",
    email: "jdelacruz@up.edu.ph",
  };

  let students = [
    {
      name: "Garth Lapitan",
      email: "glapitan@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Jemuel Juatco",
      email: "jjuatco@up.edu.ph",
      status: "Unverified",
    },
    {
      name: "Nathan Muncal",
      email: "nmuncal@up.edu.ph",
      status: "Verified",
    },
    {
      name: "Ronn Jiongco",
      email: "rjiongco@up.edu.ph",
      status: "Unverified",
    },
  ];

  // for (let i = 0; i < 3; i++) students = [...students, ...students];

  return (
    <DashboardLayout fixedContent>
      <div className="p-4">
        <h1>Settings</h1>
      </div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <Container fluid>
            <Row xs="auto" className="align-items-center p-4">
              <Col>
                <Image
                  src={
                    "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
                  }
                  width="120"
                  height="120"
                  className="me-2 img-fluid rounded-circle"
                />
              </Col>
              <Col className="px-5">
                {/* <FaEdit className="mr-1" />
                                <span> Edit </span> */}

                <Button variant="outline-primary">
                  <FaEdit className="m-1" />
                  <span className="m-1">Edit</span>
                </Button>
              </Col>
            </Row>
          </Container>
          <Stack className="px-5">
            <h6>Name</h6>
            <span className="text-black">{student.name} </span>
            <br></br>
            <h6>Email</h6>
            <span className="text-black">{student.email} </span>
          </Stack>
        </Tab>
        <Tab eventKey="shac" title="SHAC Accounts">
          <Stack>
            <Col className="gap-2">
              <a href="/add-account">
                <Button variant="outline-secondary mx-3 mb-3">
                  <FaPlus className="m-1" />
                  <span className="m-1">Add account</span>
                </Button>
              </a>
            </Col>
            <div className="flex-fill overflow-auto">
              <Table hover>
                <tbody>
                  {students.map(({ name }, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {" "}
                          <Image
                            src={
                              "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
                            }
                            width="45"
                            height="45"
                            className="me-2 img-fluid rounded-circle"
                          />
                          {name}
                          {/* <FaMinus className="m-1" /> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Stack>
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
