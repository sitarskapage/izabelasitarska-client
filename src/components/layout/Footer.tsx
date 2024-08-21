import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";

export default function Footer() {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-4">
      <Col>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            {/*  */}
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            {/*  */}
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            {/*  */}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <small>
              © {currentYear} {artists_name}
            </small>
          </Col>
        </Row>
      </Col>
    </footer>
  );
}
