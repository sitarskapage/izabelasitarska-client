import { Col, Container, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";
import { Work } from "../pages/Works";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work, onClick }: CardProps) {
  const { general, dimensions, year, images } = work;
  const { title, slug } = general;

  return (
    <Container onClick={onClick}>
      <Link to={slug || "#"}>
        <Row>
          <Col>{images[0] && <Image imageref={images[0]}></Image>}</Col>
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
