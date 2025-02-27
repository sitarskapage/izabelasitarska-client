import { useMemo, useCallback, useState, useEffect, Key } from "react";
import { Work } from "../../types/Work";
import { useFetchData } from "../hooks/useFetch";
import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";
import { AnimatePresence, motion } from "motion/react";
import { Col, Row } from "react-bootstrap";
import AnimatedButton from "./AnimatedButton";
import { useNavigate } from "react-router-dom";

type Object = {
  media: MediaRef;
  key: Key;
  position: { top: string; left: string };
};

export default function EduArtContent() {
  const { data } = useFetchData<Work[]>("works?unique=true");
  const [array, setArray] = useState<Object[]>([]);
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(
    null
  );
  const navigate = useNavigate();

  const maxImages = 8;
  const delay = 12000;

  const limitedData = useMemo(
    () => data?.slice(0, maxImages) || [],
    [data, maxImages]
  );

  const getData = useCallback(
    () =>
      limitedData.map(
        (work) =>
          work.general.published &&
          work.media?.length && {
            media: work.media[0],
            key: work.general.title,
          }
      ),
    [limitedData]
  );

  const getRandomPosition = () => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
  });

  const onComplete = (obj: Object) => {
    setArray((prev) => {
      const removedItem = prev.find((item) => item.key === obj.key);
      const updatedArray = prev.filter((item) => item.key !== obj.key);

      if (removedItem) {
        setTimeout(() => {
          setArray((curr) => [
            {
              ...removedItem,
              position: getRandomPosition(),
              key: (obj.media?.etag as string) + Date.now(),
            },
            ...curr,
          ]);
        }, Math.random() * 500);
      }

      return updatedArray;
    });
  };

  // Lifecycle
  useEffect(() => {
    const items = getData();
    const timeoutIds: NodeJS.Timeout[] = [];

    items.forEach((item, index) => {
      const timeoutId = setTimeout(
        () => {
          setArray((prev) => [
            ...prev,
            { ...item, position: getRandomPosition(), key: index + Date.now() },
          ]);
        },
        index * Math.random() * 1000
      );

      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [getData]);

  const handleClick = (label: "art" | "education") => {
    navigate(label);
  };

  return (
    <div
      className="position-relative w-100 h-100 overflow-hidden"
      style={{
        backgroundColor: hoverDirection
          ? hoverDirection !== "left"
            ? "blue"
            : "rgb(0, 255, 0)"
          : "transparent",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
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
            onClick={() => handleClick("education")}
          />
        </Col>
      </Row>

      <div
        id="Backdrop"
        className="w-100 h-100  opacity-50 z-1 position-absolute"
        style={{
          backgroundColor: hoverDirection
            ? hoverDirection !== "left"
              ? "blue"
              : "rgb(0, 255, 0)"
            : "transparent",
          transition: "background-color 0.3s ease-in-out",
        }}
      ></div>

      {/* background */}
      <AnimatePresence>
        {array.map((obj) => (
          <motion.div
            key={obj.key}
            className="position-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1, ease: "easeInOut" } }}
            style={{
              top: obj.position.top,
              left: obj.position.left,
              transform: `translate(-50%, -50%) ${
                hoverDirection === "right"
                  ? "translateX(-200%)"
                  : hoverDirection === "left"
                    ? "translateX(200%)"
                    : ""
              }`,
              width: "500px",
              height: "auto",
            }}
            onAnimationComplete={() => onComplete(obj)}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 2 }}
              transition={{ scale: { duration: delay / 1000, ease: "easeIn" } }}
              style={{
                width: "500px",
                height: "auto",
              }}
            >
              <MediaComponent media={obj.media} />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
