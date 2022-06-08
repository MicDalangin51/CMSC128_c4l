import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Stack, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import noStudent from "/src/images/no-student.svg";

import {
  DashboardLayout,
  AddStudentModal,
  MainTableControls,
  DeleteStudentModal,
  LoadingPanel,
  ErrorImg,
} from "/src/components";

const rowLimit = 50;

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Degree", value: "degree" },
];

const StudentDirectory = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      "/api/students?" + new URLSearchParams(queries),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();

    switch (response.status) {
      case 200:
        setIsLoading(false);
        setStudents(data.students);
        setTotalStudentCount(data.totalStudentCount);
    }
  }, [search, tablePage, sortBy, orderBy]);

  //deleting student
  const [deleteStudentNum, setDeleteStudentNum] = useState("");
  const [deleteStudentName, setDeleteStudentName] = useState("");
  const [deleteStudent, setShowdeleteStudent] = useState(false);
  const handleShowdeleteStudent = (student_number, student_name) => {
    setShowdeleteStudent(true);
    setDeleteStudentNum(student_number);
    setDeleteStudentName(student_name);
  };
  const handleClosedeleteStudent = () => setShowdeleteStudent(false);

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

          <DeleteStudentModal
            showModal={deleteStudent}
            closeModal={handleClosedeleteStudent}
            student_num={deleteStudentNum}
            student_name={deleteStudentName}
          />

          <div className="flex-fill overflow-auto">
            <Table hover className="table-fixed-head">
              <thead className="sticky-top">
                <tr>
                  <th>Name</th>
                  <th>Student number</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map(
                  ({ name, course_name, status, student_number }, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={`/student/${student_number}`}>{name}</Link>
                        </td>
                        <td>{student_number}</td>
                        <td>{course_name}</td>
                        <td>
                          {status == "true" && (
                            <Badge pill bg="success">
                              verified
                            </Badge>
                          )}
                          {status == "false" && (
                            <Badge pill bg="secondary">
                              unverified
                            </Badge>
                          )}
                          {status == null ||
                            (status == "pending" && (
                              <Badge pill bg="secondary">
                                unverified
                              </Badge>
                            ))}
                        </td>
                        <td>
                          <Button
                            variant="outline-none"
                            size="sm"
                            onClick={() =>
                              handleShowdeleteStudent(student_number, name)
                            }
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
            {totalStudentCount === 0 && (
              <ErrorImg image={noStudent} message="No students found" />
            )}
            {isLoading && <LoadingPanel />}
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
