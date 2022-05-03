import { useState } from "react";
import { Badge, Button, Col, Form, FormControl, InputGroup, Row, Stack, Table } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";

import { DashboardLayout } from "/src/components";

const Changelog = () => {
  // Temporary variables
  let changes = [
    {
      date: "5-1-22",
      user: "Admin 1",
      change: "change",
    },
    {
      date: "5-1-22",
      user: "Admin 2",
      change: "change",
    },
    {
      date: "5-1-22",
      user: "Admin 3",
      change: "change",
    },
    {
      date: "5-1-22",
      user: "Admin 4",
      change: "change",
    },
  ];


  return (
    <DashboardLayout fixedContent>
      <Stack className="h-100">
        <Row className="mb-2">
          <Col className="d-flex align-items-center">
            <InputGroup>
              <Button variant="outline-primary">
                <FaSearch />
              </Button>
              <FormControl placeholder="Search change" />
            </InputGroup>
          </Col>
          <Col>
            <Stack direction="horizontal" gap="2" className="justify-content-end align-items-center">
              <small>
              </small>
              <Button variant="outline-primary" disabled>
                <FaAngleLeft />
              </Button>
              <Button variant="outline-primary" disabled>
                <FaAngleRight />
              </Button>
            </Stack>
          </Col>
        </Row>
        <Stack direction="horizontal" gap="2" className="mb-2">
          <span>Sort by</span>
          <Form.Select className="w-auto">
            <option value="date">Date</option>
            <option value="user">User</option>
          </Form.Select>
          <Form.Select className="w-auto">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Stack>
        <div className="flex-fill overflow-auto">
          <Table hover className="table-fixed-head">
            <thead className="sticky-top">
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {changes.map(({ date, user, change }, index) => {
                return (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{user}</td>
                    <td>       
                     {change}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Stack>
    </DashboardLayout>
  );
};

export default Changelog;
