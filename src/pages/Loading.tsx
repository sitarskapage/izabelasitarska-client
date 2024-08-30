import { Helmet } from "react-helmet";
import AsciiLoader from "../components/Loader";
import { Col, Container, Row } from "react-bootstrap";

export default function LoadingPage() {
  return (
    <>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Row className="w-100">
          <Col className="d-flex justify-content-center">
            <AsciiLoader />
          </Col>
        </Row>
      </Container>
    </>
  );
}
