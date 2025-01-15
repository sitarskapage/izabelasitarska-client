import { Col, Row } from "react-bootstrap";
import Image from "./media/Image";
import { Link } from "react-router-dom";
import { isImage, isVideo } from "../utils/helpers";
import Video from "./media/Video";
import { Project } from "../../types/Project";

interface CardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project }: CardProps) {
  const { general, cover } = project;
  const { title, slug, description } = general;

  const image = isImage(cover) && cover;
  const video = isVideo(cover) && cover;

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
