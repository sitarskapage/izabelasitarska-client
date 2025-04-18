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

  // Helper function to determine layout
  const getMediaLayout = (media: typeof data.media) => {
    if (!media || media.length === 0) return [];

    const layout: { media: (typeof media)[0]; xs: number }[] = [];

    for (let i = 0; i < media.length; i++) {
      const current = media[i];
      const next = media[i + 1];

      // Check if the current and next images are vertical
      if (current?.height > current?.width && next?.height > next?.width) {
        layout.push({ media: current, xs: 6 });
        layout.push({ media: next, xs: 6 });
        i++; // Skip the next item since it's already paired
      } else {
        layout.push({ media: current, xs: 12 });
      }
    }
    return layout;
  };

  const mediaLayout = media ? getMediaLayout(media) : [];

  return (
    <Layout title={general.title}>
      <Col>
        <Container
          fluid
          className="d-flex flex-column gap-4 mh-100 overflow-auto py-5"
        >
          {/* Display Dimensions and Year */}
          <Row>
            <Col xs={12}>
              <p id="Details" className="text-center">
                {medium && <span>{medium}, </span>}
                {dimensions && <span>{dimensions}, </span>}
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
          <Row className="">
            <Col>
              <Container>
                {description && HTMLReactParser(description)}
              </Container>
            </Col>
          </Row>

          {/* Display Images */}
          <Row>
            {mediaLayout.length > 0 ? (
              mediaLayout.map((item, index) => (
                <Col
                  xs={item.xs}
                  key={item.media?.etag || index}
                  className="pb-3 px-2"
                >
                  <MediaComponent media={item.media} className="h-100 w-100" />
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
