import { Stack, Image } from "react-bootstrap";

const ErrorImg = ({ image, message }) => {
  return (
    <Stack className="p-3 align-items-center justify-content-center">
      <Image src={image} width="350" height="350" />
      <span className="fs-4">{message}</span>
    </Stack>
  );
};

export default ErrorImg;
