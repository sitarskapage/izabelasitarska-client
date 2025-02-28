import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Work } from "../../types/Work";
import MediaComponent from "./Media";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work }: CardProps) {
  const { general, media } = work;
  const { title, slug } = general;

  if (!media) return <p>No media</p>;

  return (
    <Link to={"/" + slug}>
      <Container>
        <Row className="gap-3 p-2">
          <Col
            xs={12}
            className="position-relative bg-dark p-0"
            style={{ height: "75dvh" }}
          >
            {/*  title */}
            <div className="position-absolute z-3 text-center top-50 start-50 translate-middle">
              <span className="display-4 fw-bolder">{title}</span>
            </div>
            {/* backdrop */}
            <div className="position-absolute start-0 top-0 bg-dark opacity-50 z-2 w-100 h-100"></div>
            {/* media */}
            <MediaComponent
              media={media[0]}
              className="w-100 h-100 object-fit-cover"
            />
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
