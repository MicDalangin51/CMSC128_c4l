import { forwardRef } from "react";
import { Table, Image, Row, Card } from "react-bootstrap";
import casLogo from "/src/images/cas-logo.png";
import upLogo from "/src/images/UP-logo.png";
import "./StudentPdf.css";

const StudentPdf = forwardRef(({ student }, ref) => {
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const currentYear = `${current.getFullYear()}`;
  return (
    <div ref={ref}>
      <header className="m-5">{date}</header>
      <div className="m-5">
        <div className="d-flex justify-content-center align-items-center">
          <Image src={upLogo} width="110" height="100" />
          <div className="m-3 text-center">
            <h5>University of the Philippines Los Baños</h5>
            College of Arts and Sciences
          </div>
          <Image src={casLogo} width="100" height="100" />
        </div>
        <div className="m-4">
          <h4 className="my-1">
            {student.last_name}, {student.first_name}
          </h4>
          <h5>{student.student_number}</h5>
          {student.course == "BACA" && (
            <h6>Bachelor of Arts in Communication Arts</h6>
          )}
          {student.course == "BAP" && <h6>Bachelor of Arts in Philosophy</h6>}
          {student.course == "BAS" && <h6>Bachelor of Arts in Sociology</h6>}
          {student.course == "BSAM" && (
            <h6>Bachelor of Science in Applied Mathematics</h6>
          )}
          {student.course == "BSAP" && (
            <h6>Bachelor of Science in Applied Physics</h6>
          )}
          {student.course == "BSB" && <h6>Bachelor of Science in Biology</h6>}
          {student.course == "BSC" && <h6>Bachelor of Science in Chemistry</h6>}
          {student.course == "BSCS" && (
            <h6>Bachelor of Science in Computer Science</h6>
          )}
          {student.course == "BSM" && (
            <h6>Bachelor of Science in Mathematics</h6>
          )}
          {student.course == "BSMST" && (
            <h6>Bachelor of Science in Mathematics and Science Teaching</h6>
          )}
          {student.course == "BSS" && (
            <h6>Bachelor of Science in Statistics</h6>
          )}
          {student.course == "BSAC" && (
            <h6>Bachelor of Science in Agricultural Chemistry</h6>
          )}
        </div>
        {student.summary?.map(({ content, semester }, index) => (
          <Card className="my-4" key={index} border="dark">
            <Card.Header as="h5">{semester}</Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr className="text-primary">
                    <th>Course Code</th>
                    <th>Grade</th>
                    <th>Units</th>
                    <th>Weight</th>
                    <th>Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {content?.map(
                    (
                      { course_number, grade, units, weight, cumulative },
                      i
                    ) => (
                      <tr key={i}>
                        <td>{course_number}</td>
                        <td>{grade}</td>
                        <td>{units}</td>
                        <td>{weight}</td>
                        <td>{cumulative}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))}

        <Card className="my-2" border="dark">
          <Card.Header as="h5">Summary</Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr className="text-primary">
                  <th>Required Units</th>
                  <th>Total Units</th>
                  <th>GWA</th>
                  <th>Total Cumulative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.req_units}</td>
                  <td>{student.total_units}</td>
                  <td>{student.GWA}</td>
                  <td>{student.total_cumulative}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div>
          © {currentYear} | UPLB College of Arts and Sciences. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
});
export default StudentPdf;
