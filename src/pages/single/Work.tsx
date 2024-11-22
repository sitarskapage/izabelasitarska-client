import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Row } from "react-bootstrap";
import Image from "../../components/Image";
import Video from "../../components/Video";
import { Link } from "react-router-dom";
import { isImage, isVideo } from "../../utils/helpers";
import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import { Work as WorkType } from "../Works";

export default function Work() {
  const data = (useLoaderData() as WorkType) || null;

  if (!data) return null;

  const { general, dimensions, medium, year, media } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout fluid title={general.title}>
      <Col xs={12} className="px-0">
        <Row className="border-bottom border-dark">
          <Col className="p-4">
            <h3 id="Details">
              {dimensions && <span>{dimensions} (cm), </span>}
              {medium && <span>{medium}, </span>}
              {year && <span>{year}</span>}
            </h3>
          </Col>
        </Row>
        {/* Display Images */}
        <Row>
          {media && media.length > 0 ? (
            media.map((item) => (
              <Col key={item?.etag} className="border-bottom border-dark p-0">
                {isImage(item) && <Image imageref={item as ImageRefSchema} />}{" "}
                {/* Render image */}
                {isVideo(item) && (
                  <Video videoref={item as VideoRefSchema} />
                )}{" "}
                {/* Render video */}
              </Col>
            ))
          ) : (
            <p>No media available for this project.</p>
          )}
        </Row>
        {/* Footer Section */}
        <Row>
          <Col className="py-4">
            <Link to={"/works"}>All Works</Link>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
