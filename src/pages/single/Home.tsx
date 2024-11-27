import { Col, Row } from "react-bootstrap";
import useCalculatePadding from "../../hooks/useCalculatePadding";

export default function Homepage() {
  const { paddingBottom: pb } = useCalculatePadding();

  const styles = {
    largeText: {
      fontSize: "50vh",
      lineHeight: 1,
      fontWeight: 700,
    },
    container: {
      height: `calc(100dvh - ${pb}px)`,
    },
    row: {
      height: "33.333%",
    },
  };
  const colClass = "d-flex flex-column text-uppercase";
  return (
    <Col xs={12} style={styles.container}>
      <Row
        className="border-bottom border-dark overflow-hidden"
        style={styles.row}
      >
        {/* Where are we going? */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Where</span>
          <span>are</span>
          <span>we</span>
          <span>going?</span>
        </Col>
      </Row>
      <Row
        className="border-bottom border-dark overflow-hidden"
        style={styles.row}
      >
        {/* What is adrenaline today? */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>What</span>
          <span>is</span>
          <span>adrenaline</span>
          <span>today?</span>
        </Col>
      </Row>
      <Row className="overflow-hidden" style={styles.row}>
        {/* Can riding a bike be an art? */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Can</span>
          <span>riding</span>
          <span>a bike</span>
          <span>be</span>
          <span>an art?</span>
        </Col>
      </Row>
    </Col>
  );
}
