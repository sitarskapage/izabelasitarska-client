import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { Head, Section } from "../../components/Section";
import { Outlet, useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

export default function Homepage() {
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <Layout title="">
      <Col className="d-flex flex-column h-100">
        <Row className="bg-black">
          <Section
            id={"home"}
            key={"home"}
            style={{ height: isMobile ? "auto" : "90dvh" }}
          >
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
                backgroundColor:
                  location.pathname == "/art"
                    ? "blue"
                    : location.pathname == "/edu"
                      ? "rgb(0,255,0"
                      : "transparent",
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
