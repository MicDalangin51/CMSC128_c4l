import { Dropdown, Image, Nav, Stack } from "react-bootstrap";
import { FaCog, FaHistory, FaUsers } from "react-icons/fa";
import casLogo from "/src/images/cas-logo.png";
import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const SideBar = () => {
  const username = "Abbott Young";

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
          className="d-flex align-items-center shadow-none"
        >
          {/* <Image src={""} width="32" height="32" className="me-2" /> */}
          <span className="me-2">{username}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow">
          <Dropdown.Item href="/logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default SideBar;
