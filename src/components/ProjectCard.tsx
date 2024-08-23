import { Col, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";

import { Project } from "../pages/Projects";

interface CardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project }: CardProps) {
  const { general, images } = project;
  const { title, slug, description } = general;
  return (
    <Row>
      <Col md={6}>
        {" "}
        <Link to={slug || "#"}>
          {images[0] && <Image imageref={images[0]}></Image>}{" "}
        </Link>
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
