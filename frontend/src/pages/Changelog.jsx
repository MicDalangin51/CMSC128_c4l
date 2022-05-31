import { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";

import { DashboardLayout, MainTableControls } from "/src/components";

const rowLimit = 50;

const sortOptions = [
  { label: "Date", value: "date" },
  { label: "User", value: "user" },
];

const Changelog = () => {
  const [changeLogs, setChangeLogs] = useState([]);
  const [totalChangeLogCount, setTotalChangeLogCount] = useState(0);
  const [search, setSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [orderBy, setOrderBy] = useState("asc");

  useEffect(async () => {
    const response = await fetch("/api/changelog");
    const data = await response.json();
    setChangelog(data.changelog);
  }, []);

  return (
    <DashboardLayout fixedContent>
      <Stack className="h-100">
        <MainTableControls
          objectName="change log"
          totalObjectCount={totalChangeLogCount}
          tablePage={tablePage}
          rowLimit={rowLimit}
          setTablePage={setTablePage}
          sortOptions={sortOptions}
          onSortVariableChange={(e) => setSortBy(e.target.value)}
          onSortOrderChange={(e) => setOrderBy(e.target.value)}
          setSearch={setSearch}
        />
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
              {changeLogs.map(({ date, user, change }, index) => {
                return (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{user}</td>
                    <td>{change}</td>
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
