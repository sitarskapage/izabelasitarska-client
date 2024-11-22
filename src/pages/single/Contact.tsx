import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import Layout from "../../components/layout/Layout.";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

export default function Contact() {
  const data = (useLoaderData() as ProfileSchema) || null;

  if (!data) return null;

  const { contact } = data;

  return (
    <Layout title="Contact">
      <Col className="d-flex flex-column">
        {contact?.map((c, i) => (
          <Row key={i}>
            <Col>
              <Row>
                <Col>{c.name}</Col>
              </Row>
              <Row>
                <Col>{c.email}</Col>
              </Row>
              <Row>
                <Col>
                  {c.socialmedia?.map((sm, i) => (
                    <Container key={i}>
                      <Link
                        to={sm.profileUrl || "#"}
                        target="_blank"
                        style={{ display: "flex", gap: "0.25rem" }}
                      >
                        <i
                          className={
                            "bi " + "bi-" + sm.platform?.toLocaleLowerCase() ||
                            ""
                          }
                        ></i>
                        {sm.username}
                      </Link>
                    </Container>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <Row className="mt-auto border-top border-dark small">
          <Col className="d-flex align-items-center pt-1">
            {" "}
            <a
              href="https://www.paypal.com/paypalme/jakubkanna"
              target="_blank"
              className="ms-auto d-flex gap-1"
            >
              <i className="bi bi-paypal"></i>Donate
            </a>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
