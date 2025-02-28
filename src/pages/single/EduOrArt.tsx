import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Work } from "../../../types/Work";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import WorkCard from "../../components/WorkCard";
import AnimatedButton from "../../components/AnimatedButton";

export default function EduOrArt({
  data: init,
  variant = "education",
}: {
  data: Work[];
  variant: "art" | "education";
}) {
  const { slug } = useParams();
  const isArt = variant == "art";

  const data = init.filter((item) =>
    item.general.tags.some((tag: { title: string }) => tag.title === variant)
  );
  const navigate = useNavigate();

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout
          title={isArt ? "Art" : "Edu"}
          header={{
            className: isArt
              ? "bg-blue text-center text-light"
              : "bg-green text-center text-light",
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
                          navigate(variant === "art" ? "/education" : "/art")
                        }
                        variant={["white", "small"]}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            ),
          }}
          body={{
            className: isArt ? "bg-blue " : "bg-green ",
          }}
          footer={{
            className: isArt ? "pb-4 bg-blue" : "pb-4 bg-green",
            node: <span></span>,
          }}
        >
          <Container
            fluid
            className={isArt ? "bg-blue text-light" : "bg-green text-light"}
          >
            <Row>
              {data.map(
                (item, i) =>
                  item.general.published && (
                    <Col key={i} xs={12} md={6} lg={4}>
                      {/* Adjusted to create a 3-column layout */}
                      <WorkCard work={item} />
                    </Col>
                  )
              )}
            </Row>
          </Container>
        </Layout>
      )}
    </>
  );
}
