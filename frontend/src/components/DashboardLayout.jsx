import { Stack } from "react-bootstrap";

import { SideBar } from "/src/components";

const DashboardLayout = ({ children }) => {
  return (
    <Stack direction="horizontal">
      <SideBar />
      <div className="vr"></div>
      <div className="min-vh-100 flex-fill p-4">{children}</div>
    </Stack>
  );
};

export default DashboardLayout;
