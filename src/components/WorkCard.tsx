import { Col, Container, Row } from "react-bootstrap";
import Image from "./Image";
import { Link } from "react-router-dom";
import { Work } from "../pages/Works";
import Video from "./Video";
import { isImage, MediaRef, isVideo } from "../utils/helpers";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work }: CardProps) {
  const { general, dimensions, year, media } = work;
  const { title, slug } = general;

  if (!media) return;

  const image = isImage(media[0] as MediaRef) && (media[0] as MediaRef);
  const video = isVideo(media[0] as MediaRef) && (media[0] as MediaRef);
  return (
    <Link to={"/works/" + slug}>
      <div className="h-100">
        {image && (
          <Image
            imageref={image}
            className="h-100 mw-100 position-absolute top-0 start-50 translate-middle-x"
          />
        )}
        {video && <Video videoref={video}></Video>}
        <div className="position-absolute bottom-0 start-50 translate-middle">
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
        </div>{" "}
      </div>
    </Link>
  );
}
