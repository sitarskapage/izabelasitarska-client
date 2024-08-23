import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Container, Row } from "react-bootstrap";
import { Project as ProjectSchema } from "../Projects";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import WorkCard from "../../components/WorkCard";
import Video from "../../components/Video";

export default function Project() {
  const data = (useLoaderData() as ProjectSchema) || null;

  if (!data) return null;

  const {
    general,
    subtitle,
    start_date,
    end_date,
    venue,
    urls,
    images,
    videos,
    works,
  } = data;

  return (
    <Layout title={general.title}>
      <Container className="d-flex flex-column gap-4">
        <Row>
          <Col xs={6}>
            <p>
              {start_date && (
                <>
                  {start_date} - {end_date}
                </>
              )}
            </p>
            <p>{subtitle}</p>
            <p>{venue}</p>
            {works.length > 0 && (
              <p>
                <span>Works: </span>
                {works.map((w) => (
                  <>
                    <Link key={w.general.slug} to={"/works/" + w.slug}>
                      {w.general.title}
                    </Link>
                    {works.length > 1 && <span>, </span>}
                  </>
                ))}
              </p>
            )}
          </Col>
        </Row>
        <Row className="gap-3">
          {images &&
            images.map((img) => (
              <Col>
                <Image imageref={img} key={img.etag} />
              </Col>
            ))}
        </Row>
        <Row className="gap-3">
          {videos &&
            videos.map((video) => (
              <Col xs={12}>
                <Video videoref={video} key={video.etag} />{" "}
              </Col>
            ))}
        </Row>
        <Row className="gap-3">
          {works.length > 0 &&
            works.map((w) => (
              <Col xs={12}>
                <WorkCard work={w} key={w.id} />{" "}
              </Col>
            ))}
        </Row>

        <Row>
          <Col>
            <span>Related: </span>
            {urls &&
              urls.map((url) => (
                <>
                  <Link to={url.url} target="_blank">
                    {url.title}
                  </Link>
                  {urls.length > 1 && <span>, </span>}
                </>
              ))}
            <span>, </span>
            <Link to={"/projects"}>All Projects</Link>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
}
