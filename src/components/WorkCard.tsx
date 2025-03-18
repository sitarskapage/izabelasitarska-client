import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Work } from "../../types/Work";
import MediaComponent from "./Media";
import { Post } from "../pages/Posts";
import { useEffect, useState } from "react";
import { GeneralSectionSchema } from "@jakubkanna/labguy-front-schema";
import { MediaRef } from "../utils/helpers";

interface CardProps {
  work: Work | Post;
  variant?: "art" | "edu";
  onClick?: () => void;
}

export default function WorkCard({ work: item, variant = "art" }: CardProps) {
  const [general, setGeneral] = useState<GeneralSectionSchema | null>(null);
  const [media, setMedia] = useState<MediaRef[]>([]);

  useEffect(() => {
    if ("media" in item && Array.isArray(item.media) && item.media.length) {
      console.log(item.general, item.media); // Logs correctly
      setGeneral(item.general); // ✅ Updates state
      setMedia(item.media);
    } else if ("content" in item && Array.isArray(item.content)) {
      const itemMedia = item.content
        .filter(
          (block) => "images" in block || "videos" in block || "models" in block
        )
        .flatMap((block) => [
          ...(block.images ?? []),
          ...(block.videos ?? []),
          ...(block.models ?? []),
        ]);

      setGeneral(item.general);
      setMedia(itemMedia);
    }
  }, [item]);

  if (!general) return <p>Invalid content</p>;

  const { title, slug } = general;

  if (!media.length) return <p>No media</p>;

  return (
    <Link to={`/${variant}/${slug}`}>
      <Container>
        <Row className="gap-3 p-2">
          <Col
            xs={12}
            className="position-relative bg-dark p-0"
            style={{ height: "75dvh" }}
          >
            {/*  title */}
            <div className="position-absolute z-3 text-center top-50 start-50 translate-middle">
              <span className="display-4 fw-bolder">{title}</span>
            </div>
            {/* backdrop */}
            <div className="position-absolute start-0 top-0 bg-dark opacity-50 z-2 w-100 h-100"></div>
            {/* media */}
            <MediaComponent
              media={media[0]}
              className="w-100 h-100 object-fit-cover"
              variant="loop"
            />
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
