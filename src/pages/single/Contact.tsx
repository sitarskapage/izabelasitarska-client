import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import Layout from "../../components/layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import useIsMobile from "../../hooks/useIsMobile";
import * as Icons from "react-bootstrap-icons";
import { Paypal } from "react-bootstrap-icons";

const getIconComponent = (iconName: string) => {
  const pascalCase = iconName
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase())
    .replace(/\s+/g, "");
  return Icons[pascalCase as keyof typeof Icons] || null;
};

export default function Contact() {
  const { data } = useFetchData<ProfileSchema>("profile/1");
  const isMobile = useIsMobile();

  if (!data) return null;

  const { contact } = data;

  return (
    <Layout title="Contact">
      <Col xs={12}>
        <Container
          className={
            isMobile
              ? "h-100 d-flex flex-column py-2 px-0"
              : "border-start border-end border-dark h-100 d-flex flex-column py-2"
          }
        >
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
                  <Col className="d-flex flex-column">
                    {c.socialmedia?.map((sm, i) => {
                      const IconComponent = sm.platform
                        ? getIconComponent(sm.platform)
                        : null;
                      return (
                        <div className="d-inline-block" key={i}>
                          <Link
                            to={sm.profileUrl || "#"}
                            target="_blank"
                            style={{ gap: "0.25rem" }}
                            className="d-flex align-items-center"
                          >
                            {IconComponent && <IconComponent />}
                            {sm.username}
                          </Link>
                        </div>
                      );
                    })}
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
                className="ms-auto d-flex gap-1 align-items-center"
              >
                <Paypal />
                Donate
              </a>
            </Col>
          </Row>
        </Container>
      </Col>
    </Layout>
  );
}
