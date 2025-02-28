import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { Head, Section } from "../../components/Section";
import { Outlet } from "react-router-dom";

export default function Homepage() {
  return (
    <Layout title="">
      <Col className="d-flex flex-column h-100">
        <Row>
          <Section id={"home"} key={"home"} style={{ height: "90dvh" }}>
            <Head />
          </Section>
        </Row>
        <Row>
          <Col className="p-0">
            <Section
              id={"edu-art"}
              key={"edu-art"}
              style={{
                minHeight: "90dvh",
              }}
            >
              <Container fluid className="p-0">
                <Outlet />
              </Container>
            </Section>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
