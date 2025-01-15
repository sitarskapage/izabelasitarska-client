import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useFetchData } from "../../hooks/useFetch";

export default function Contact() {
  const { data } = useFetchData<ProfileSchema>("profile/1");

  if (!data) return null;

  const { contact } = data;

  return (
    <Layout title="Contact">
      {contact?.map((c, i) => (
        <Container key={i}>
          {" "}
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
                        "bi " + "bi-" + sm.platform?.toLocaleLowerCase() || ""
                      }
                    ></i>
                    {sm.username}
                  </Link>
                </Container>
              ))}
            </Col>
          </Row>
        </Container>
      ))}
    </Layout>
  );
}
