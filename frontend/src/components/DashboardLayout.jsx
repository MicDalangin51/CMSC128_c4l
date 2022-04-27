import { Stack } from "react-bootstrap";

import { SideBar } from "/src/components";

const DashboardLayout = ({ children, fixedContent = "" }) => {
  return (
    <Stack direction="horizontal">
      <SideBar />
      <div className="vr"></div>
      <Stack className={`flex-fill p-4 ${fixedContent && "overflow-hidden vh-100"}`}>{children}</Stack>
    </Stack>
  );
};

export default DashboardLayout;
