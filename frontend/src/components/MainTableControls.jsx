import { useState, useEffect } from "react";
import {
  Row,
  Col,
  InputGroup,
  Button,
  ButtonGroup,
  Form,
  Stack,
} from "react-bootstrap";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const MainTableControls = ({
  objectName,
  totalObjectCount,
  tablePage,
  rowLimit,
  setTablePage,
  sortOptions,
  onAddObjectClick,
  setSearch,
  onSortVariableChange,
  onSortOrderChange,
}) => {
  const [objectStartRange, setObjectStartRange] = useState(1);
  const [objectEndRange, setObjectEndRange] = useState(rowLimit);

  const updateSearch = (e) => {
    e.preventDefault();

    setSearch(e.target.search.value);
  };

  const goToPreviousPage = () => {
    setTablePage(tablePage - 1);
  };

  const goToNextPage = () => {
    setTablePage(tablePage + 1);
  };

  useEffect(() => {
    setObjectStartRange((tablePage - 1) * rowLimit + 1);

    const computedObjectEndRange = tablePage * rowLimit;
    setObjectEndRange(
      computedObjectEndRange <= totalObjectCount
        ? computedObjectEndRange
        : totalObjectCount
    );
  }, [tablePage, totalObjectCount]);

  return (
    <>
      <Row className="mb-2">
        <Col className="d-flex align-items-center">
          <Form onSubmit={updateSearch} className="w-100">
            <InputGroup>
              <Button type="submit" variant="outline-primary">
                <FaSearch />
              </Button>
              <Form.Control
                name="search"
                placeholder={`Search ${objectName}`}
              />
            </InputGroup>
          </Form>
        </Col>
        {onAddObjectClick && (
          <Col xs="auto">
            <Button onClick={onAddObjectClick}>Add {objectName}</Button>
          </Col>
        )}
      </Row>
      <Row className="mb-1">
        <Col>
          <Stack direction="horizontal" gap="2">
            <span>Sort by</span>
            <InputGroup size="sm" className="w-auto">
              <Form.Select className="w-auto" onChange={onSortVariableChange}>
                {sortOptions.map(({ label, value }, index) => (
                  <option value={value} key={index}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              <Form.Select className="w-auto" onChange={onSortOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </InputGroup>
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap="2" className="justify-content-end">
            <span>
              {`${
                totalObjectCount &&
                `${objectStartRange} - ${objectEndRange} of ${totalObjectCount}`
              } ${objectName}s`}
            </span>
            <ButtonGroup size="sm">
              <Button
                variant="outline-primary"
                onClick={goToPreviousPage}
                disabled={objectStartRange == 1}
              >
                <FaAngleLeft />
              </Button>
              <Button
                variant="outline-primary"
                onClick={goToNextPage}
                disabled={totalObjectCount === objectEndRange}
              >
                <FaAngleRight />
              </Button>
            </ButtonGroup>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default MainTableControls;
