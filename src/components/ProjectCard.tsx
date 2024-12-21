import { Col, Row } from "react-bootstrap";
import Image from "./media/Image";
import { Link } from "react-router-dom";

import { Project } from "../pages/Projects";
import { isImage, isVideo } from "../utils/helpers";
import Video from "./media/Video";

interface CardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project }: CardProps) {
  const { general, media } = project;
  const { title, slug, description } = general;
  if (!media) return;

  const image = isImage(media[0]) && media[0];
  const video = isVideo(media[0]) && media[0];

  return (
    <Row>
      <Col md={6}>
        <Link to={slug || "#"}>
          {image && <Image imageref={image}></Image>}
          {video && <Video videoref={video}></Video>}
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
