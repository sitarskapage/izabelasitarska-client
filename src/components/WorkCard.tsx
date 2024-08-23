import { Col, Container, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";
import { Work } from "../pages/Works";
import Video from "./Video";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work, onClick }: CardProps) {
  const { general, dimensions, year, images, videos } = work;
  const { title, slug } = general;

  return (
    <Container onClick={onClick}>
      <Link to={"/works/" + (slug || "#")}>
        <Row className="gap-3">
          <Col xs={12}>
            {images && images[0] ? (
              <Image imageref={images[0]}></Image>
            ) : (
              videos && videos[0] && <Video videoref={videos[0]} />
            )}
          </Col>
        </Row>
      </Link>
      <Row>
        <span style={{ textDecoration: "none" }}>
          <span style={{ fontStyle: "italic" }}>{title}</span>
          {", " + dimensions + " "}
          <span style={{ fontSize: "0.8em" }}>(cm)</span>
          {", " + year}
        </span>
      </Row>
    </Container>
  );
}
