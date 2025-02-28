import { Outlet, useParams } from "react-router-dom";
import { Work } from "../../../types/Work";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import WorkCard from "../../components/WorkCard";

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
          }}
          body={{
            className: isArt ? "bg-blue " : "bg-green ",
          }}
          footer={{
            className: isArt ? "pb-5 bg-blue" : "pb-5 bg-green",
            node: <span></span>,
          }}
        >
          <Container
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
