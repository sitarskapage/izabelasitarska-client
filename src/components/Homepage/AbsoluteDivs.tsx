import { motion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import Image from "../Image";

const AbsoluteDivs = () => {
  return (
    <>
      {/* 1 */}
      <motion.div
        key={"absoluteDiv0"}
        initial={{ x: "-100dvw" }}
        animate={{ x: 0 }}
        exit={{ x: "100dvw" }}
        transition={{ duration: 0.25 }}
        className="position-absolute w-100 border border-dark top-0 start-0 z-3 bg-kanna display-2 font-times pt-2 ps-3"
        id="absoluteDiv0"
      >
        <span> Latest:</span>
      </motion.div>

      {/* 2*/}
      <motion.div
        key={"absoluteDiv1"}
        initial={{ x: "-100dvw", y: "-100%" }}
        animate={{ x: 0, y: "-100%" }}
        exit={{ x: "100dvw", y: "-100%" }}
        transition={{ duration: 0.25, delay: 0.25 }}
        className="position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3 pt-2"
        id="absoluteDiv1"
        style={{
          top: "calc(33.3333%)",
        }}
      >
        <span className="font-monospace">Post:</span>
        <span
          className="display-5 font-times ps-3 d-block pb-2"
          style={{ lineHeight: 1 }}
        >
          Title
        </span>
      </motion.div>

      {/* 3 */}
      <motion.div
        key={"absoluteDiv1-1"}
        initial={{ y: "-100%", x: "-100dvw" }}
        animate={{ y: -1, x: "0" }}
        exit={{ y: "100%", x: "100dvw" }}
        transition={{
          duration: 0.25,
          delay: 0.25,
          y: { delay: 0.8, ease: "linear" },
        }}
        className="position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3"
        id="absoluteDiv1-1"
        style={{
          top: "calc(33.3333%)",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={10}></Col>
            <Col xs={2} className="border-start border-dark pt-2">
              {/* <Image imageref={} /> */}
              <span className="font-monospace opacity-0">Post:</span>
              <span
                className="display-5 font-times ps-3 d-block opacity-0 pb-2"
                style={{ lineHeight: 1 }}
              >
                Title
              </span>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* 4 */}
      <motion.div
        key={"absoluteDiv2"}
        initial={{ x: "-100dvw", y: "-1px" }}
        animate={{ x: 0, y: "-1px" }}
        exit={{ x: "100dvw", y: "-1px" }}
        transition={{ duration: 0.25, delay: 0.65 }}
        className="position-absolute w-100 border border-dark start-0 z-3 bg-kanna ps-3 pt-2"
        id="absoluteDiv2"
        style={{
          top: "calc(66.6666%)",
        }}
      >
        <span className="font-monospace">Work:</span>
        <span className="display-5 font-times ps-3 d-block  pb-2">Title</span>
      </motion.div>
    </>
  );
};

export default AbsoluteDivs;
