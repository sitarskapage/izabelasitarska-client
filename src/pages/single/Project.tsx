import { useOutletContext } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import {
  GeneralSectionSchema,
  ProjectSchema,
} from "@jakubkanna/labguy-front-schema";
import { Col, Row } from "react-bootstrap";

export default function Project() {
  const selected: ProjectSchema = useOutletContext();

  const general = selected.general as GeneralSectionSchema;

  if (!selected) return null;

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
