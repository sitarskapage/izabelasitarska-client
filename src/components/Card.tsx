import { Col, Container, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";
import {
  GeneralSectionSchema,
  ImageRefSchema,
} from "@jakubkanna/labguy-front-schema";

interface CardProps {
  general: GeneralSectionSchema;
  image?: ImageRefSchema;
  onClick?: () => void;
}

export default function Card({ general, image, onClick }: CardProps) {
  const { title, slug, description } = general;
  return (
    <Container onClick={onClick}>
      <Link to={slug || "#"}>
        <Row>
          <Col>
            <h3>{title}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>{image && <Image image={image}></Image>}</Col>
        </Row>
      </Link>
      <Row>
        <Col>
          <p className="text-truncate">{description}</p>
        </Col>
      </Row>
    </Container>
  );
}
