import { Col, Container, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { Work } from "../pages/Works";

interface CardProps {
  work: Work;
  image?: ImageRefSchema;
  onClick?: () => void;
}

export default function WorkCard({ work, image, onClick }: CardProps) {
  const { general, dimensions, year } = work;
  const { title, slug } = general;

  return (
    <Container onClick={onClick}>
      <Link to={slug || "#"}>
        <Row>
          <Col>{image && <Image image={image}></Image>}</Col>
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
