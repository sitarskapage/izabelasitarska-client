import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Container, Row } from "react-bootstrap";
import { Project as ProjectSchema } from "../Projects";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import WorkCard from "../../components/WorkCard";

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
      <Container className="d-flex flex-column gap-3">
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
                  <Link key={w.general.slug} to={"/works/" + w.slug}>
                    {w.general.title}
                  </Link>
                ))}
              </p>
            )}
          </Col>
        </Row>
        <Row>
          <Col>{images && images.map((img) => <Image imageref={img} />)}</Col>
        </Row>
        <Row>
          <Col>
            {/* {videos.map((video) => (
            <Video videoref={video} />
          ))} */}
          </Col>
        </Row>
        <Row>
          <Col>
            {works.length > 0 && works.map((w) => <WorkCard work={w} />)}
          </Col>
        </Row>
        <Row>
          <Col>Related</Col>
        </Row>
        <Row>
          <Col>
            {urls &&
              urls.map((url) => (
                <Link to={url.url} target="_blank">
                  {url.title}
                </Link>
              ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to={"/projects"}>Show all Projects</Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
