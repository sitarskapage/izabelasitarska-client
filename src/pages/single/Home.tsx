import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Col, Row } from "react-bootstrap";

import Background from "../../components/Background";
import Layout from "../../components/layout/Layout";
import Section from "../../components/Section";
import EduArtContent from "../../components/EduArt.section";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);

  if (!preferences) return null;

  const { homepage_media } = preferences;

  return (
    <Layout title="">
      <Col className="d-flex flex-column gap-2 h-100">
        <Row>
          <Section id={"home"}>
            <Section.Layout
              title="IZABELA SITARSKA"
              body={<Background media={homepage_media} />}
            ></Section.Layout>
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
