import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import HTMLReactParser from "html-react-parser/lib/index";
import MediaComponent from "../../components/Media";
import { parseDate } from "../../utils/helpers";
import Layout from "../../components/layout/Layout";
import { useFetchData } from "../../hooks/useFetch";
import { Project as ProjectSchema } from "../../../types/Project";

export default function Project() {
  const { slug } = useParams();
  const { data } = useFetchData<ProjectSchema>(`projects/${slug}`);

  if (!data) return null;

  const {
    general,
    subtitle,
    start_date,
    end_date,
    venue,
    urls,
    media,
    works,
    text,
  } = data;

  if (!general.published) return "This page is private.";

  const formattedStartDate = parseDate(start_date);
  const formattedEndDate = parseDate(end_date);

  return (
    <Layout title={general.title}>
      <Container className="d-flex flex-column gap-4">
        <Row>
          <Col xs={6}>
            {formattedStartDate && (
              <p>
                {formattedStartDate}{" "}
                {formattedEndDate ? "- " + formattedEndDate : "- N/A"}
              </p>
            )}
            {subtitle && <p>{subtitle}</p>}
            {venue && <p>{venue}</p>}
            {text && <>{HTMLReactParser(text as string)}</>}
            {works && works.length > 0 && (
              <p>
                <span>Works: </span>
                {works.map((w, index) => (
                  <span key={w.general.slug}>
                    <Link to={`/works/${w.general.slug}`}>
                      {w.general.title}
                    </Link>
                    {index < works.length - 1 && <span>, </span>}
                  </span>
                ))}
              </p>
            )}
          </Col>
        </Row>

        {/* Render media (images or videos) */}
        <Row className="gap-3">
          <Col xs={12}>
            {media && media.length > 0 ? (
              media.map((m) => <MediaComponent media={m} />)
            ) : (
              <p>No media available for this project.</p>
            )}
          </Col>
        </Row>

        {/* Works section */}
        <Row className="gap-3">
          {works && works.length > 0 ? (
            works.map((w) => (
              <Col xs={12} key={w.id}>
                <WorkCard work={w} />
              </Col>
            ))
          ) : (
            <p>No works available for this project.</p>
          )}
        </Row>

        {/* Related links */}
        <Row>
          <Col>
            <span>Related: </span>
            {urls && urls.length > 0 ? (
              urls.map((url, index) => (
                <span key={url.id}>
                  <Link to={url.url} target="_blank">
                    {url.title}
                  </Link>
                  {index < urls.length - 1 && <span>, </span>}
                </span>
              ))
            ) : (
              <p>No related links available.</p>
            )}{" "}
            <Link to="/projects">All Projects</Link>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
}
