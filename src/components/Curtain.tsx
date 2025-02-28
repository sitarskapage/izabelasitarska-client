import { motion } from "framer-motion"; // Using "framer-motion" (correct package)
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const Curtain = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(false);
  }, [location]);

  if (isHidden) return null;
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 "
      id="Curtain"
      style={{
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ height: "200dvh", y: "-200dvh" }}
        animate={{ y: "200dvh" }}
        // exit={{ y: "100dvh" }}
        transition={{ bounce: 0, duration: 0.66 }}
        onAnimationComplete={() => setIsHidden(true)}
        hidden={isHidden}
      >
        <Row className="bg-light h-100">
          <Col xs={1}></Col>
          <Col className="bg-dark"></Col>
          <Col></Col>
          <Col className="bg-dark"></Col>
          <Col></Col>
          <Col className="bg-dark"></Col>
          <Col xs={1}></Col>
        </Row>
      </motion.div>
    </div>
  );
};
