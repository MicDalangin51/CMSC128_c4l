import { forwardRef } from "react";
import { Table, Image, Row, Card } from "react-bootstrap";
import casLogo from "/src/images/cas-logo.png";
import upLogo from "/src/images/UP-logo.png";

const StudentPdf = forwardRef(({ student }, ref) => {
  return (
    <div ref={ref}>
      <div className="m-5">
        <div className="d-flex justify-content-center align-items-center">
          <Image src={casLogo} width="100" height="100" />
          <p className="m-3">
            {" "}
            University of the Philippines Los Baños <br />
            College of Arts and Sciences
          </p>
          <Image src={upLogo} width="110" height="100" />
        </div>

        <h3>
          {student.last_name}, {student.first_name}
        </h3>
        <h4>{student_number}</h4>
        <h5>{student.course}</h5>

        {student.summary?.map(({ content, semester }, index) => (
          <Card key={index}>
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
      </div>
    </div>
  );
});
export default StudentPdf;
