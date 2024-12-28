import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AbsoluteDivs = () => {
  const div2Ref = useRef<HTMLDivElement | null>(null);
  const [div2Height, setDiv2Height] = useState("auto");
  const [hidden0, setHidden0] = useState(false);
  const [hidden1, setHidden1] = useState(false);
  const [hidden2, setHidden2] = useState(false);

  useEffect(() => {
    if (div2Ref.current) setDiv2Height(div2Ref.current.offsetHeight + "px");
  }, []);

  const baseDelay = 0.15;
  const initialTransition = { duration: 0.25 };
  const exitTransition = { duration: 0.125 }; // 0.25/2
  const sharedExitSettings = { ease: "linear" };

  const divSettings = [
    {
      id: "absoluteDiv1",
      key: "absoluteDiv1",
      initial: { x: "-100dvw" },
      animate: { x: 0 },
      exit: {
        x: "100dvw",
        transition: { ...exitTransition, ...sharedExitSettings },
      },
      style: { cursor: "pointer" },
      delayMultiplier: 0,
      className:
        "position-absolute w-100 border-bottom border-dark top-0 start-0 z-3 bg-kanna display-2 font-times pt-2 ps-3",
      content: <span>Latest:</span>,
      hidden: hidden0,
      onClick: () => setHidden0(true),
    },
    {
      id: "absoluteDiv2",
      key: "absoluteDiv2",
      initial: { x: "-100dvw", y: "-100%" },
      animate: { x: 0, y: "-100%" },
      exit: { x: "100dvw", y: "-100%", transition: exitTransition },
      style: { top: "calc(33.3333%)", cursor: "pointer" },
      delayMultiplier: 1,
      className:
        "position-absolute w-100 border-top border-bottom border-dark start-0 z-3 bg-kanna ps-3",
      content: (
        <Link to="#" className="d-block" style={{ textDecoration: "none" }}>
          <div ref={div2Ref} className="pt-2">
            <span className="font-monospace">Post:</span>
            <span
              className="display-5 font-times ps-3 d-block pb-2"
              style={{ lineHeight: 1 }}
            >
              Title
            </span>
          </div>
        </Link>
      ),
    },
    {
      id: "absoluteDiv3",
      key: "absoluteDiv3",
      initial: { y: "-100%", x: "-100dvw" },
      animate: { y: 0, x: "0" },
      exit: {
        y: "100%",
        x: "100dvw",
        transition: {
          ...exitTransition,
          y: { delay: 0.4, ...sharedExitSettings },
        },
      },
      transition: {
        duration: 0.25,
        delay: 0.25,
        y: { delay: 0.8, ease: "linear" },
      },
      style: { top: "calc(33.3333%)", cursor: "pointer" },
      delayMultiplier: 2,
      className: "position-absolute w-100 start-0 z-3 bg-kanna",
      content: (
        <Container
          fluid
          style={{ height: div2Height }}
          hidden={hidden1}
          onClick={() => setHidden1(true)}
          className="border-bottom border-dark  ps-3"
        >
          <Row className="h-100">
            <Col xs={10}></Col>
            <Col
              xs={2}
              className="border-start border-dark pt-2 px-0 h-100 overflow-hidden d-flex flex-column justify-content-center"
            >
              <img
                src={`${
                  import.meta.env.BASE_URL
                }/images/exodus-walker_jakubkanna.png`}
                className="w-100 object-fit-cover"
                style={{ mixBlendMode: "multiply" }}
              ></img>
            </Col>
          </Row>
        </Container>
      ),
      hidden: hidden1,
      onClick: () => setHidden1(true),
    },
    {
      id: "absoluteDiv4",
      key: "absoluteDiv4",
      initial: { x: "-100dvw", y: 0 },
      animate: { x: 0, y: 0 },
      exit: { x: "100dvw", y: 0, transition: exitTransition },
      style: { bottom: "calc(33.333%)", cursor: "pointer" },
      delayMultiplier: 3,
      className:
        "position-absolute w-100 border-bottom border-top border-dark start-0 z-3 bg-kanna ps-3",
      content: (
        <Link to="#" className="d-block" style={{ textDecoration: "none" }}>
          <div className="pt-2">
            <span className="font-monospace">Work:</span>
            <span
              className="display-5 font-times ps-3 d-block pb-2"
              style={{ lineHeight: 1 }}
            >
              Title
            </span>
          </div>
        </Link>
      ),
    },
    {
      id: "absoluteDiv5",
      key: "absoluteDiv5",
      initial: { y: "-100%", x: "-100dvw" },
      animate: { y: 0, x: 0 },
      exit: {
        y: "100%",
        x: "100dvw",
        transition: {
          ...exitTransition,
          y: { delay: 0.65, ...sharedExitSettings },
        },
      },
      style: { top: "calc(66.6666%)", cursor: "pointer" },
      delayMultiplier: 3,
      transition: {
        duration: 0.25,
        delay: 0.25,
        y: { delay: 1.2, ease: "linear" },
      },
      className: "position-absolute w-100 start-0 z-3 bg-kanna",

      content: (
        <Container
          fluid
          style={{ height: div2Height }}
          hidden={hidden2}
          onClick={() => setHidden2(true)}
          className="border-bottom border-dark ps-3"
        >
          <Row className="h-100">
            <Col xs={10}></Col>
            <Col
              xs={2}
              className="border-start border-dark pt-2 px-0 h-100 overflow-hidden d-flex flex-column justify-content-center"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/exodus-eyes.png`}
                className="w-100 object-fit-cover"
                style={{ mixBlendMode: "multiply" }}
              ></img>
            </Col>
          </Row>
        </Container>
      ),
      hidden: hidden2,
      onClick: () => setHidden2(true),
    },
  ];

  return (
    <>
      {divSettings.map(
        ({
          id,
          key,
          initial,
          animate,
          exit,
          style,
          className,
          content,
          delayMultiplier,
          transition,
          hidden,
          onClick,
        }) =>
          !hidden && (
            <motion.div
              key={key}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={
                transition
                  ? transition
                  : {
                      ...initialTransition,
                      delay: delayMultiplier * baseDelay,
                    }
              }
              className={className}
              id={id}
              style={style}
              onClick={onClick}
            >
              {content}
            </motion.div>
          )
      )}
    </>
  );
};

export default AbsoluteDivs;
