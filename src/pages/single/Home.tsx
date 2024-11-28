import { Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  containerTopToBottom,
  containerTransDuration,
} from "../../utils/framerMotionVariants";
import { ReactNode } from "react";
import React from "react";

function Homepage() {
  const styles = {
    largeText: {
      fontSize: "50vh",
      lineHeight: 1,
      fontWeight: 700,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: `100%`,
    },
    row: {
      height: "33.333%",
    },
  };

  const colClass = "d-flex flex-column text-uppercase";

  const RowWrapper = ({
    children,
    delay,
    z,
  }: {
    children: ReactNode;
    delay?: number;
    z: number;
  }) => {
    return (
      <motion.div
        key={z}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerTopToBottom}
        transition={{ duration: delay || containerTransDuration }}
        style={styles.row}
        className={`row border-bottom border-dark overflow-hidden bg-light z-${z} position-relative`}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <Col xs={12} style={styles.container as React.CSSProperties}>
      {/* Where are we going? */}
      <RowWrapper delay={0.183} z={2}>
        {/* 0.183 = 0.5 / 1/3 */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Where</span>
          <span>are</span>
          <span>we</span>
          <span>going?</span>
        </Col>
      </RowWrapper>
      {/* What is adrenaline today? */}
      <RowWrapper delay={0.275} z={1}>
        {/* 0.183 = 0.5 / 1/2 */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>What</span>
          <span>is</span>
          <span>adrenaline</span>
          <span>today?</span>
        </Col>
      </RowWrapper>
      {/* Can riding a bike be an art? */}
      <RowWrapper delay={0.5} z={0}>
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Can</span>
          <span>riding</span>
          <span>a bike</span>
          <span>be</span>
          <span>an art?</span>
        </Col>
      </RowWrapper>
    </Col>
  );
}
export default React.memo(Homepage);
