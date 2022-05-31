import { useState, useEffect } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Form,
  InputGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaMinus,
  FaEdit,
} from "react-icons/fa";

import {
  DashboardLayout,
  AddStudentModal,
  MainTableControls,
} from "/src/components";

const rowLimit = 50;

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Degree", value: "degree" },
];

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [totalStudentCount, setTotalStudentCount] = useState(0);
  const [search, setSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [orderBy, setOrderBy] = useState("asc");
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const openAddStudentModal = () => {
    setShowAddStudentModal(true);
  };

  const closeAddStudentModal = () => {
    setShowAddStudentModal(false);
  };

  useEffect(async () => {
    const studentStartRange = (tablePage - 1) * rowLimit + 1;

    const queries = {
      search,
      offset: studentStartRange - 1,
      limit: rowLimit,
      sort_by: sortBy,
      order: orderBy,
    };

    const response = await fetch(
      "/api/students?" + new URLSearchParams(queries)
    );
    const data = await response.json();

    setStudents(data.students);
    setTotalStudentCount(data.totalStudentCount);
  }, [search, tablePage, sortBy, orderBy]);

  // //deletes a student
  // const deleteStudent = async (student_id) => {
  //   console.log(student_id);
  //   const response = await fetch(`/api/students`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       student_id: student_id,
  //     }),
  //   });

  //   switch (response.status) {
  //     case 200:
  //       console.log("Student deleted");
  //       break;
  //     default:
  //       console.log("Student not deleted");
  //   }
  // };

  //deletes a student
  function deleteStudent(student_number) {
    console.log(student_number);
    const row = {
      student_number: student_number,
    };

    fetch(`/api/students`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
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
    // location.reload();
  }

  return (
    <>
      <DashboardLayout fixedContent>
        <Stack className="h-100">
          <MainTableControls
            objectName="student"
            totalObjectCount={totalStudentCount}
            tablePage={tablePage}
            rowLimit={rowLimit}
            setTablePage={setTablePage}
            sortOptions={sortOptions}
            onSortVariableChange={(e) => setSortBy(e.target.value)}
            onSortOrderChange={(e) => setOrderBy(e.target.value)}
            onAddObjectClick={openAddStudentModal}
            setSearch={setSearch}
          />
          <div className="flex-fill overflow-auto">
            <Table hover className="table-fixed-head">
              <thead className="sticky-top">
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map(
                  ({ name, course_name, status, student_number }, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href={`/student/${student_number}`}>{name}</a>
                        </td>
                        <td>{course_name}</td>
                        <td>
                          {status == "verified" && (
                            <Badge pill bg="success">
                              {status}
                            </Badge>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="outline-none"
                            size="sm"
                            onClick={() => deleteStudent(student_number)}
                          >
                            <FaMinus />
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
      </DashboardLayout>
      <AddStudentModal
        show={showAddStudentModal}
        closeAddStudentModal={closeAddStudentModal}
      />
    </>
  );
};

export default StudentDirectory;
