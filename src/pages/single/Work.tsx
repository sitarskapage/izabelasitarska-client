import { Col, Row } from "react-bootstrap";
import Image from "../../components/Image";
import Video from "../../components/Video";
import { useParams } from "react-router-dom";
import { isImage, isVideo } from "../../utils/helpers";
import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import { Work as WorkSchema } from "../Works";
import Layout from "../../components/layout/Layout";
import { useFetchData } from "../../hooks/useFetch";

export default function Work() {
  const { slug } = useParams();
  const { data } = useFetchData<WorkSchema>(`works/${slug}`);
  if (!data) return null;

  const { general, dimensions, medium, year, media, urls } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout title={general.title}>
      <Col xs={12}>
        {year && (
          <Row className="border-bottom border-dark">
            <Col className="p-4">
              <h3 id="Details">
                {dimensions && <span>{dimensions} (cm), </span>}
                {medium && <span>{medium}, </span>}
                {year && <span>{year}</span>}
              </h3>
              {urls && (
                <>
                  <span>Links: </span>

                  {urls.map((url, index) => (
                    <>
                      <a href={url.url}>{url.title}</a>
                      {index < urls.length - 1 && <span>, </span>}
                    </>
                  ))}
                </>
              )}
            </Col>
          </Row>
        )}
        {/* Display Images */}
        <Row className="border-bottom border-dark">
          {media && media.length > 0 ? (
            media.map((item) => (
              <Col xs={12} key={item?.etag}>
                <Row>
                  {isImage(item) && (
                    <Image
                      imageref={item as ImageRefSchema}
                      className="p-0 img-fluid"
                    />
                  )}{" "}
                  {/* Render image */}
                  {isVideo(item) && <Video videoref={item as VideoRefSchema} />}
                  {/* Render video */}
                </Row>
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
        {/* Footer Section */}
        <Row>
          {/* <Col className="py-4">
            <Link to={"/works"}>All Works</Link>
          </Col> */}
        </Row>
      </Col>
    </Layout>
  );
}
