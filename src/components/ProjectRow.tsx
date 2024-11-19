import { Col, Row } from "react-bootstrap";
import { isMobile } from "../utils/helpers";
import { Link } from "react-router-dom";
import { Project } from "../pages/Projects";

interface ProjectRowProps {
  id: string;
  image: JSX.Element;
  data?: Project;
  isLast?: boolean;
  isNew?: boolean;
}

export default function ProjectRow({
  id,
  image,
  data,
  isLast,
  isNew,
}: ProjectRowProps) {
  const classes = isLast
    ? "gap-3 py-4 px-2"
    : "gap-3 py-4 px-2 border-bottom border-dark";

  return (
    <Row className={classes} style={{ height: "33.3%" }} id={id}>
      <Col className="d-flex justify-content-center align-items-center">
        {image}
      </Col>
      {!isMobile() && (
        <Col xs={9} className="d-flex flex-column justify-content-between">
          {isNew && (
            <Row>
              <Col className="w-auto d-flex justify-content-end">
                <span className="badge bg-dark">New</span>
              </Col>{" "}
            </Row>
          )}
          <Row>
            <p className="mt-2">{data?.general.description}</p>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Link to={data?.general.slug || "#"}>View</Link>{" "}
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}
