import { Row, Stack, Image, Container, Col, Tabs, Tab } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

import { DashboardLayout } from "/src/components";

const Settings = () => {
    return (
        <DashboardLayout fixedContent>
            <div className="p-4">
                <h1>Settings</h1>
            </div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <Container fluid>
                        <Row xs="auto" className="align-items-center p-4">
                            <Col>
                                <Image src={"https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"} width="120" height="120" className="me-2 img-fluid rounded-circle" />
                            </Col>
                            <Col className="px-5">
                                <FaEdit className="mr-1" />
                                <span> Edit </span>
                            </Col>
                        </Row>
                    </Container>
                    <Stack className="px-5">
                        <span>Name</span>
                        <span>Jemuel Juatco </span>
                        <br></br>
                        <span>Email</span>
                        <span>jjuatco@up.edu.ph </span>
                    </Stack>
                </Tab>
                <Tab eventKey="shac" title="SHAC Accounts">
                    <Container>
                        <Row>
                            <Col className="align-items-center">
                                <Image src={"https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"} width="50" height="50" className="me-2 img-fluid rounded-circle" />
                                Jemuel Juatco
                            </Col>
                            <Col>2</Col>
                            <Col>3</Col>
                        </Row>
                    </Container>
                </Tab>
            </Tabs>


        </DashboardLayout>
    );
};

export default Settings;
