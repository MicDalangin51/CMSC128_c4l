import { Stack, Image } from "react-bootstrap";

const ErrorImg = ({ image, message }) => {
  return (
    <Stack className="p-4 align-items-center justify-content-center">
      <Image src={image} width="800" height="300" />
      <span className="fs-3">{message}</span>
    </Stack>
  );
};

export default ErrorImg;
