import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Row } from "react-bootstrap";
import { Project as ProjectSchema } from "../Projects";

export default function Project() {
  const data = (useLoaderData() as ProjectSchema) || null;

  if (!data) return null;

  const { general } = data;

  return (
    <Layout title={general.title}>
      <Col>
        <Row>{general.title}</Row>
        <Row>{general.title}</Row>
        <Row>{general.title}</Row>
      </Col>
    </Layout>
  );
}
