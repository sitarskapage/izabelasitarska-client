import { motion, useScroll, useTransform } from "framer-motion";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GeneralContext } from "../contexts/GeneralContext";
import Background from "./Background";
import { Link } from "react-router-dom";

interface SectionProps {
  id: string;
  children?: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
  return (
    <section
      id={id}
      style={{ height: "90dvh" }}
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

function Head({ subtitle, footer }: SectionHeadProps) {
  const { preferences } = useContext(GeneralContext);

  const { scrollY } = useScroll();
  const fontSize = useTransform(
    scrollY,
    [0, window.innerHeight / 2],
    ["15vw", "5vw"]
  );

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
          <p className="archivo-narrow text-center text-uppercase text-elipsis w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            expedita doloremque rem corporis consequatur delectus dolor
            voluptates asperiores officia voluptate incidunt, temporibus, in
            nulla neque sunt. Sequi ab nesciunt culpa.
          </p>
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

// Attach the Head subcomponent to Section
Section.Head = Head;

export default Section;
