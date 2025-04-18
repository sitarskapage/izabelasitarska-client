import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GeneralContext } from "../contexts/GeneralContext";
import Background from "./Background";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import { useFetchData } from "../hooks/useFetch";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import HTMLReactParser from "html-react-parser/lib/index";
import { MediaRef } from "../utils/helpers";

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
  const { data: profile } = useFetchData<ProfileSchema>("profile/1");
  const isMobile = useIsMobile();
  const fontSize = ScrollEffects();

  if (!preferences) return;

  const { homepage_media } = preferences;
  const statement = profile?.statement && HTMLReactParser(profile.statement);

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
            className="text-center"
          >
            IZABELA
            <br />
            SITARSKA
          </motion.h1>
          {subtitle}
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <Col className="h-100 d-flex justify-content-center align-items-center text-light d-flex flex-column">
          {homepage_media && (
            <Background media={homepage_media as MediaRef} isLoop />
          )}
          {!isMobile && (
            <div
              className={
                "archivo-narrow text-center text-uppercase w-50 text-ellipsis-5"
              }
            >
              {statement}
            </div>
          )}
          <Link to={"/bio"}>Read more</Link>
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
