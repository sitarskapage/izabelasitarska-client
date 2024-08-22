import { Col, Row } from "react-bootstrap";
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

export default function ProjectCard({ general, image }: CardProps) {
  const { title, slug, description } = general;
  return (
    <Row>
      <Col md={6}>
        {" "}
        <Link to={slug || "#"}>{image && <Image image={image}></Image>} </Link>
      </Col>
      <Col md={6}>
        <Link to={slug || "#"}>
          <h3>{title}</h3>
        </Link>
        <p className="text-truncate">{description}</p>
      </Col>
    </Row>
  );
}
