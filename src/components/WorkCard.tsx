import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { is3d, isImage, isVideo } from "../utils/helpers";
import Image from "./media/Image";
import Video from "./media/Video";
import { Work } from "../../types/Work";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import Model from "./media/Model";
interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work }: CardProps) {
  const { general, dimensions, year, media } = work;
  const { title, slug } = general;

  if (!media) return <p>No media</p>;

  const image = isImage(media[0]) && media[0];
  const video = isVideo(media[0]) && media[0];
  const threed = is3d(media[0]) && media[0];

  return (
    <Link to={"/works/" + slug}>
      <Container>
        <Row className="gap-3 p-2">
          <Col xs={12}>
            {image && <Image imageref={image}></Image>}
            {video && (
              <Video videoref={video} playerProps={{ light: true }}></Video>
            )}
            {threed &&
              (threed.poster ? (
                <Image
                  imageref={threed.poster as ImageRefSchema}
                  className="img-fluid"
                />
              ) : (
                <Model threedref={threed} />
              ))}
          </Col>
        </Row>
        <Row className="text-center">
          <span style={{ textDecoration: "none" }}>
            <span style={{ fontStyle: "italic" }}>{title}</span>
            {dimensions && (
              <>
                {", " + dimensions + " "}
                <span style={{ fontSize: "0.8em" }}>(cm)</span>
              </>
            )}
            {year && <>{", " + year}</>}{" "}
          </span>
        </Row>{" "}
      </Container>
    </Link>
  );
}
