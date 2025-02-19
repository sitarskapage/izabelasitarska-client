import { Col, Row } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import Section from "../../components/Section";
import EduArtContent from "../../components/EduArt.section";

export default function Homepage() {
  return (
    <Layout title="">
      <Col className="d-flex flex-column gap-2 h-100">
        <Row>
          <Section id={"home"}>
            <Section.Head />
          </Section>
        </Row>
        <Row>
          <Section id={"home"}>
            <EduArtContent />
          </Section>
        </Row>
      </Col>
    </Layout>
  );
}
