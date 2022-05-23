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
import { useEffect, useState } from "react";
import { DashboardLayout } from "/src/components";

const Settings = () => {
  // Temporary variables
  var currentStaff = {
    name: "Garth Lapitan",
    department: "ICS",
    access: 1,
  };

  let staffAccounts = [
    {
      name: "Garth Lapitan",
      department: "ICS",
      access: 1,
    },
    {
      name: "Jemuel Juatco",
      department: "ICS",
      access: 0,
    },
    {
      name: "Nathan Muncal",
      department: "ICS",
      access: 0,
    },
    {
      name: "Ronn Jiongco",
      department: "ICS",
      access: 0,
    },
  ];

  const [staff, setStaff] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/staff");
    const data = await response.json();
    setStudents(data.staff);
  }, []);

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

                {/* <Button variant="outline-primary">
                  <FaEdit className="m-1" />
                  <span className="m-1">Edit</span>
                </Button> */}
              </Col>
            </Row>
          </Container>
          <Stack className="px-5">
            <h6>Name</h6>
            <span className="text-black">{currentStaff.name} </span>
            <br></br>
            <h6>Email</h6>
            <span className="text-black">{currentStaff.department} </span>
            <br></br>
            <h6>Access Level</h6>
            <span className="text-black">
              {currentStaff.access ? "Admin" : "Staff"}
            </span>
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
                <thead>
                  <tr className="text-secondary">
                    <th>Name</th>
                    <th>Department</th>
                    <th>Access Level</th>
                  </tr>
                </thead>
                <tbody>
                  {staffAccounts.map(({ name, department, access }, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>
                          {" "}
                          <Image
                            src={
                              "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
                            }
                            width="45"
                            height="45"
                            className="me-2 img-fluid rounded-circle"
                          />
                          <FaMinus className="m-1" />
                        </td> */}
                        <td>{name}</td>
                        <td>{department}</td>
                        <td>{access ? "Admin" : "Staff"}</td>
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
