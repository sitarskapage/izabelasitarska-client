import { Link, useNavigate } from "react-router-dom";
import { Work } from "../../../types/Work";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import WorkCard from "../../components/WorkCard";
import AnimatedButton from "../../components/AnimatedButton";
import { Post } from "../Posts";

export default function EduOrArt({
  data,
  variant = "edu",
}: {
  data: Work[] | Post[];
  variant: "art" | "edu";
}) {
  const isArt = variant == "art";

  const navigate = useNavigate();

  return (
    <>
      <Layout
        title={isArt ? "Art" : "Education"}
        header={{
          className: "text-center text-light",
          node: (
            <Col>
              <Container fluid>
                <Row>
                  <Col className="d-flex" md={6}>
                    <Link to="/">
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <span className="text-light">
                          <i className="bi bi-arrow-left-short"></i> Back
                        </span>
                      </div>
                    </Link>
                    <h1 className="font-imperial fw-light mb-0 ms-auto me-auto">
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </h1>
                  </Col>
                  <Col
                    className="d-flex justify-content-end align-items-end"
                    md={6}
                  >
                    <AnimatedButton
                      label={variant === "art" ? "Education" : "Art"}
                      onClick={() =>
                        navigate(variant === "art" ? "/edu" : "/art")
                      }
                      variant={["white", "small"]}
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          ),
        }}
        footer={{
          className: "pb-4",
          node: <span></span>,
        }}
      >
        <Container fluid className={"text-light"}>
          <Row className="p-3">
            {data.map(
              (item, i) =>
                item.general.published && (
                  <Col key={i} xs={12} md={6} lg={4} className="p-0">
                    {/* Adjusted to create a 3-column layout */}
                    <WorkCard work={item} variant={variant} />
                  </Col>
                )
            )}
          </Row>
        </Container>
      </Layout>
    </>
  );
}
