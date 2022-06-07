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
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { DashboardLayout, EditShacModal } from "/src/components";

const Settings = () => {
  // const [currentStaff, setCurrentStaff] = useState([]);
  // var user = sessionStorage.getItem("currentUser");
  // var userr = JSON.parse(user);
  // const currentUser = userr.name.replace(/["]+/g, "");

  // var dept = sessionStorage.getItem("currentDepartment");
  // var deptt = JSON.parse(dept);
  // const currentDept = deptt.name.replace(/["]+/g, "");

  // useEffect(async () => {
  //   const response = await fetch(`/api/users/${faculty_id}`);
  //   const data = await response.json();
  //   setCurrentStaff(data.currentStaff);
  // }, []);

  var currentUser = localStorage.getItem("currentUser");
  var currentDept = localStorage.getItem("currentDepartment");
  var currentAccess = localStorage.getItem("currentAccess");

  const [staff, setStaff] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setStaff(data.staff);
  }, []);

  // for (let i = 0; i < 3; i++) students = [...students, ...students];

  function deleteSHACuser(faculty_id) {
    fetch(`/api/users/${faculty_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        faculty_id: faculty_id,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          console.log("Successfully deleted!");
        } else {
          console.log("Failed to delete!");
        }
      });
    location.reload();
  }

  //edit SHAC member
  const [editStaffName, seteditStaffName] = useState("");
  const [editFacultyid, seteditFacultyid] = useState("");

  const [showSHACEdit, setShowSHACEdit] = useState(false);
  const handleShowSHACEdit = (staff_name, faculty_id) => {
    setShowSHACEdit(true);
    seteditStaffName(staff_name);
    seteditFacultyid(faculty_id);
  };

  const handleCloseSHACEdit = () => setShowSHACEdit(false);

  return (
    <DashboardLayout fixedContent>
      <EditShacModal
        showModal={showSHACEdit}
        closeModal={handleCloseSHACEdit}
        facultyid={editFacultyid}
        current_staffname={editStaffName}
      />

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
              {/* <Col>
                <Image
                  src={
                    "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
                  }
                  width="120"
                  height="120"
                  className="me-2 img-fluid rounded-circle"
                />
              </Col> */}
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
            <span className="text-black">{currentUser}</span>
            <br></br>
            <h6>Department</h6>
            <span className="text-black">{currentDept} </span>
            <br></br>
            <h6>Access Level</h6>
            <span className="text-black">
              {currentAccess === 0 ? "Admin" : "Staff"}
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
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(
                    (
                      { name, faculty_id, email, department, access_level },
                      index
                    ) => {
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
                          <td>{access_level ? "Admin" : "Staff"}</td>
                          <td>
                            <Button
                              variant="outline-none"
                              size="sm"
                              onClick={() =>
                                handleShowSHACEdit(name, faculty_id)
                              }
                            >
                              <FaEdit />
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-none"
                              size="sm"
                              onClick={() => deleteSHACuser(faculty_id)}
                            >
                              <RiDeleteBin2Fill />
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
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
