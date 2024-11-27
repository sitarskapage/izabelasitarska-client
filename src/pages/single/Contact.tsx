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
      <Col xs={12}>
        <Container className="border-start border-end border-dark h-100 d-flex flex-column py-2">
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
                      <div className="d-inline-block" key={i}>
                        <Link
                          to={sm.profileUrl || "#"}
                          target="_blank"
                          style={{ display: "flex", gap: "0.25rem" }}
                        >
                          <i
                            className={
                              "bi " +
                                "bi-" +
                                sm.platform?.toLocaleLowerCase() || ""
                            }
                          ></i>
                          {sm.username}
                        </Link>
                      </div>
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
        </Container>
      </Col>
    </Layout>
  );
}
