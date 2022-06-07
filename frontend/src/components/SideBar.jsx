import { Dropdown, Image, Nav, Stack } from "react-bootstrap";
import { FaCog, FaHistory, FaUsers } from "react-icons/fa";
import casLogo from "/src/images/cas-logo.png";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    icon: FaUsers,
    label: "Student Directory",
    href: "/",
  },
  {
    icon: FaHistory,
    label: "Change Log",
    href: "/change-log",
  },
  {
    icon: FaCog,
    label: "Settings",
    href: "/settings",
  },
];

const SideBar = () => {
  const username = localStorage.getItem("currentUser");

  const logOut = async () => {
    const res = await fetch("/api/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    switch (res.status) {
      case 200:
        localStorage.removeItem("name");
        localStorage.removeItem("accessToken");

        const navigate = useNavigate();
        navigate("/login");
        break;
      default:
    }
  };

  return (
    <Stack className="flex-grow-0 p-3 vh-100 sticky-top">
      <Stack direction="horizontal" gap="2" className="align-items-center">
        <Image src={casLogo} width="32" height="32" />
        <span className="fs-4">GWA Verifier</span>
      </Stack>
      <hr />
      <Nav variant="pills" className="flex-column mb-auto">
        {navItems.map(({ icon: Icon, label, href }, index) => (
          <Nav.Item key={index}>
            <Nav.Link as={RouterNavLink} className="link-dark" to={href}>
              <Stack
                direction="horizontal"
                gap="2"
                className="align-items-center"
              >
                <Icon />
                {label}
              </Stack>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <hr />
      <Dropdown drop="up">
        <Dropdown.Toggle
          variant="white"
          className="d-flex align-items-center shadow-none w-100 hover"
        >
          <span className="me-2 me-auto">{username}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow">
          <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default SideBar;
