import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import AnimatedButton from "./AnimatedButton";
import { Curtain } from "./Curtain";
import useIsMobile from "../hooks/useIsMobile";
import { supportsHEVC } from "../utils/helpers";

export default function EduArtContent() {
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(
    null
  );
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  const videoUrl = supportsHEVC()
    ? "/bg/section_background.mp4"
    : "/bg/section_background_h264.mp4";

  // Handle cached image case
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("video is ready:", videoReady);
    console.log("loading:", loading);
  }, [videoReady, loading]);

  const handleClick = (label: "art" | "edu") => navigate(label);

  const containerStyle = {
    backgroundColor: hoverDirection
      ? hoverDirection === "left"
        ? "rgb(0, 255, 0)"
        : "blue"
      : "transparent",
    transition: "background-color 0.3s ease-in-out",
    height: "90dvh",
  };

  const backdropStyle = {
    backgroundColor: hoverDirection
      ? "rgba(255,255,255,0.75)"
      : "rgba(255,255,255,0)",
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <div
      className="position-relative w-100 overflow-hidden"
      style={containerStyle}
    >
      <Curtain hidden={!loading} />

      {/* Buttons overlay */}
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

      {/* Hover effect */}
      <div
        id="Backdrop"
        className="w-100 h-100 opacity-25 z-1 position-absolute"
        style={backdropStyle}
      />

      {/* Background media */}
      <div className="video-cover position-absolute w-100 h-100 top-0 start-0 z-0">
        {!videoReady && (
          <img
            ref={imgRef}
            src="./bg/poster.jpg"
            alt="poster"
            onLoad={() => setLoading(false)}
          />
        )}
        {!isMobile && (
          <ReactPlayer
            url={videoUrl}
            playing
            loop
            muted
            width="100%"
            height="100%"
            onReady={() => {
              setVideoReady(true);
              setLoading(false);
            }}
            onError={() => {
              setVideoReady(false);
              setLoading(false);
            }}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
      </div>
    </div>
  );
}
