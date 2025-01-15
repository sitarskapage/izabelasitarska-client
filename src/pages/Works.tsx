import { Outlet, useParams } from "react-router-dom";
import WorkCard from "../components/WorkCard";
import { Row, Col, Container } from "react-bootstrap"; // Add Container and Row
import Layout from "../components/layout/Layout";
import { useFetchData } from "../hooks/useFetch";
import { Work } from "../../types/Work";

export default function Works() {
  const { data } = useFetchData<Work[]>("works?unique=true");

  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Works"}>
          <Container>
            <Row>
              {data.map(
                (item, i) =>
                  item.general.published && (
                    <Col key={i} xs={12} md={6} lg={4}>
                      {" "}
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
