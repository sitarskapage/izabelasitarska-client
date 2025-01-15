import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";

export default function NotFoundPage() {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (!showPage) {
    return null; // Render nothing until the timeout is over
  }

  return (
    <Container>
      <Col className="position-fixed top-50 start-50 translate-middle text-center font-monospace">
        <p>404 Page not found :(</p>
        <Link to={"/"}>Home</Link>
      </Col>
    </Container>
  );
}
