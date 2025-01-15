import { useContext, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import useIsMobile from "../../hooks/useIsMobile";

export default function Footer({
  setFooterHeight,
}: {
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  // Measure content height when it is rendered
  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.clientHeight;
      if (height) setFooterHeight(height);
    }
  }, [setFooterHeight, isMobile]);

  return (
    <footer
      className="position-absolute bottom-0 start-0 container-fluid mt-4"
      ref={footerRef}
    >
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
          <Col className="d-flex align-items-end justify-content-end">
            <small>
              © {currentYear} {artists_name}
            </small>
          </Col>
        </Row>
      </Col>
    </footer>
  );
}
