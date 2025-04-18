import { Col, Row } from "react-bootstrap";
import AnimatedButton from "./AnimatedButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Curtain } from "./Curtain";

export default function EduArtContent() {
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(
    null
  );
  const [videoReady, setVideoReady] = useState(false);

  const navigate = useNavigate();

  const handleClick = (label: "art" | "edu") => {
    navigate(label);
  };
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="position-relative w-100 overflow-hidden"
      style={{
        backgroundColor: hoverDirection
          ? hoverDirection !== "left"
            ? "blue"
            : "rgb(0, 255, 0)"
          : "transparent",
        transition: "background-color 0.3s ease-in-out",
        height: "90dvh",
      }}
    >
      {" "}
      <Curtain hidden={!loading} />
      {/* overlay */}
      <Row className="position-absolute z-2 w-100 h-100">
        <Col
          id="Art"
          className="text-center d-flex justify-content-center align-items-center"
          onMouseEnter={() => setHoverDirection("right")}
          onMouseLeave={() => setHoverDirection(null)}
        >
          <AnimatedButton label="Art" onClick={() => handleClick("art")} />
        </Col>
        <Col
          id="Education"
          className="text-center d-flex justify-content-center align-items-center"
          onMouseEnter={() => setHoverDirection("left")}
          onMouseLeave={() => setHoverDirection(null)}
        >
          <AnimatedButton
            label="Education"
            onClick={() => handleClick("edu")}
          />
        </Col>
      </Row>
      <div
        id="Backdrop"
        className="w-100 h-100 opacity-25 z-1 position-absolute"
        style={{
          backgroundColor: hoverDirection
            ? hoverDirection !== "left"
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.75)"
            : "rgba(255,255,255,0)",
          transition: "background-color 0.3s ease-in-out",
        }}
      ></div>
      {/* background */}
      <div className="video-cover position-absolute w-100 h-100 top-0 start-0 z-0">
        {!videoReady && (
          <img
            src="./bg/poster.jpg"
            alt="poster"
            onLoad={() => setLoading(false)}
          />
        )}
        <ReactPlayer
          url="./bg/section_background.mp4"
          playing
          loop
          muted
          width="100%"
          height="100%"
          onStart={() => setVideoReady(true)}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}
