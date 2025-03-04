import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GeneralContext } from "../contexts/GeneralContext";
import Background from "./Background";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

interface SectionProps {
  id: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section({ id, children, style }: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className="overflow-hidden position-relative"
    >
      {children}
    </section>
  );
}

interface SectionHeadProps {
  footer?: React.ReactNode;
  subtitle?: React.ReactNode;
}
function ScrollEffects() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  return useTransform(
    smoothScrollY,
    [0, window.innerHeight / 2],
    ["15vw", "5vw"]
  );
}
export function Head({ subtitle, footer }: SectionHeadProps) {
  const { preferences } = useContext(GeneralContext);
  const isMobile = useIsMobile();
  const fontSize = ScrollEffects();
  if (!preferences) return null;
  const { homepage_media } = preferences;

  return (
    <Container
      className="d-flex flex-column py-5 gap-5"
      style={{ height: "100%" }}
    >
      <Row>
        <Col className="d-flex flex-column justify-content-center text-center text-light archivo-narrow">
          <motion.h1
            style={{
              fontSize,
              lineHeight: "0.90",
              fontWeight: "900",
              fontStretch: "extra-condensed",
            }}
          >
            <span>IZABELA</span>
            <br />
            <span>SITARSKA</span>
          </motion.h1>
          {subtitle}
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <Col className="h-100 d-flex justify-content-center align-items-center text-light d-flex flex-column">
          <Background media={homepage_media} />
          {!isMobile && (
            <p
              className={
                "archivo-narrow text-center text-uppercase w-50 text-ellipsis-5"
              }
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              expedita doloremque rem corporis consequatur delectus dolor
              voluptates asperiores officia voluptate incidunt, temporibus, in
              nulla neque sunt. Sequi ab nesciunt culpa.
            </p>
          )}
          <Link to={"/bio"}>read more</Link>
        </Col>
      </Row>
      {footer && (
        <Row>
          <Col>{footer}</Col>
        </Row>
      )}
    </Container>
  );
}
