import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const AbsoluteDivs = () => {
  const div2Ref = useRef<HTMLDivElement | null>(null);
  const [div2Height, setDiv2Height] = useState("auto");

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
      exit: { x: "100dvw", transition: exitTransition },
      style: {},
      delayMultiplier: 0,
      className:
        "position-absolute w-100 border border-dark top-0 start-0 z-3 bg-kanna display-2 font-times pt-2 ps-3",
      content: <span>Latest:</span>,
    },
    {
      id: "absoluteDiv2",
      key: "absoluteDiv2",
      initial: { x: "-100dvw", y: "-100%" },
      animate: { x: 0, y: "-100%" },
      exit: { x: "100dvw", y: "-100%", transition: exitTransition },
      style: { top: "calc(33.3333%)" },
      delayMultiplier: 1,
      className:
        "position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3 pt-2",
      content: (
        <div ref={div2Ref}>
          <span className="font-monospace">Post:</span>
          <span
            className="display-5 font-times ps-3 d-block pb-2"
            style={{ lineHeight: 1 }}
          >
            Title
          </span>
        </div>
      ),
    },
    {
      id: "absoluteDiv3",
      key: "absoluteDiv3",
      initial: { y: "-100%", x: "-100dvw" },
      animate: { y: -1, x: "0" },
      exit: {
        y: "100%",
        x: "100dvw",
        transition: {
          ...exitTransition,
          y: { delay: 0.4, ...sharedExitSettings },
        },
      },
      style: { top: "calc(33.3333%)" },
      delayMultiplier: 2,
      className:
        "position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3",
      content: (
        <Container fluid style={{ height: div2Height }}>
          <Row className="h-100">
            <Col xs={10}></Col>
            <Col
              xs={2}
              className="border-start border-dark pt-2 px-0 h-100 overflow-hidden d-flex flex-column justify-content-center"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/walker_jakubkanna.png`}
                className="w-100 object-fit-cover"
                style={{ mixBlendMode: "multiply" }}
              ></img>
            </Col>
          </Row>
        </Container>
      ),
    },
    {
      id: "absoluteDiv4",
      key: "absoluteDiv4",
      initial: { x: "-100dvw", y: "0px" },
      animate: { x: 0, y: "0px" },
      exit: { x: "100dvw", y: "0px", transition: exitTransition },
      style: { bottom: "calc(33.333%)" },
      delayMultiplier: 3,
      className:
        "position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3",
      content: (
        <>
          <span className="font-monospace">Work:</span>
          <span className="display-5 font-times ps-3 d-block pb-2">Title</span>
        </>
      ),
    },
    {
      id: "absoluteDiv5",
      key: "absoluteDiv5",
      initial: { y: "-100%", x: "-100dvw" },
      animate: { y: -1, x: "0" },
      exit: {
        y: "100%",
        x: "100dvw",
        transition: {
          ...exitTransition,
          y: { delay: 0.65, ...sharedExitSettings },
        },
      },
      style: { top: "calc(66.6666%)" },
      delayMultiplier: 3,
      className:
        "position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3",
      content: (
        <Container fluid style={{ height: div2Height }}>
          <Row className="h-100">
            <Col xs={10}></Col>
            <Col
              xs={2}
              className="border-start border-dark pt-2 px-0 h-100 overflow-hidden d-flex flex-column justify-content-center"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/walker_jakubkanna.png`}
                className="w-100 object-fit-cover"
                style={{ mixBlendMode: "multiply" }}
              ></img>
            </Col>
          </Row>
        </Container>
      ),
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
        }) => (
          <motion.div
            key={key}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{
              ...initialTransition,
              delay: delayMultiplier * baseDelay,
            }}
            className={className}
            id={id}
            style={style}
          >
            {content}
          </motion.div>
        )
      )}
    </>
  );
};

export default AbsoluteDivs;
