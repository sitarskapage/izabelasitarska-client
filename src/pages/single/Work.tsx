import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useFetchData } from "../../hooks/useFetch";
import { Work as WorkSchema } from "../../../types/Work";
import MediaComponent from "../../components/Media";
import Layout from "../../components/layout/Layout";
import HTMLReactParser from "html-react-parser";

export default function Work() {
  const { slug } = useParams();
  const { data } = useFetchData<WorkSchema>(`works/${slug}`);
  if (!data) return null;

  const { general, dimensions, medium, year, media, urls, description } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout title={general.title}>
      <Col>
        <Container className="d-flex flex-column gap-4 mh-100 overflow-auto py-5">
          {/* Display Dimensions and Year */}
          <Row>
            <Col xs={12}>
              <p id="Details" className="text-center">
                {dimensions && <span>{dimensions} (cm), </span>}
                {medium && <span>{medium}, </span>}
                {year && <span>{year}</span>}
                {urls && urls.length > 0 && (
                  <>
                    <br />
                    <span>Links: </span>

                    {urls.map((url, index) => (
                      <>
                        <a href={url.url}>{url.title}</a>
                        {index < urls.length - 1 && <span>, </span>}
                      </>
                    ))}
                  </>
                )}
              </p>
            </Col>
          </Row>
          <Row>{description && HTMLReactParser(description)}</Row>

          {/* Display Images */}
          <Row className="gap-3">
            {media && media.length > 0 ? (
              media.map((item) => (
                <Col xs={12} key={item?.etag}>
                  <MediaComponent media={item} />
                </Col>
              ))
            ) : (
              <p>No media available for this project.</p>
            )}
          </Row>
          {/* Footer Section */}
        </Container>
      </Col>
    </Layout>
  );
}
