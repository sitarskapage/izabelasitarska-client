import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";

export default function NotFoundPage() {
  return (
    <Container>
      <Col className="position-fixed top-50 start-50 translate-middle text-center font-monospace">
        <p>404 Page not found :(</p>
        <Link to={"/"}>Home</Link>
      </Col>
    </Container>
  );
}
