import { forwardRef } from "react";

const StudentPdf = forwardRef((props, ref) => {
  return (
    <div {...props} ref={ref}>
      <h1>pdf display</h1>
    </div>
  );
});

export default StudentPdf;
