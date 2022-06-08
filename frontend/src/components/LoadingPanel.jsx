import { Stack, Spinner } from "react-bootstrap";

const LoadingPanel = () => {
  return (
    <Stack className="p-3 align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />
    </Stack>
  );
};

export default LoadingPanel;
