import { Col, Row } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { Head, Section } from "../../components/Section";
import { Outlet } from "react-router-dom";

export default function Homepage() {
  return (
    <Layout title="">
      <Col className="d-flex flex-column h-100">
        <Row>
          <Section id={"home"} key={"home"}>
            <Head />
          </Section>
        </Row>
        <Row>
          <Col className="p-0">
            <Section id={"edu-art"} key={"edu-art"}>
              <Outlet />
            </Section>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
