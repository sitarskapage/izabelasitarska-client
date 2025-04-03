import { useMemo, useCallback, useState, useEffect, Key } from "react";
import { Post } from "../pages/Posts";
import { Work } from "../../types/Work";
import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";
import { AnimatePresence, motion } from "motion/react";
import { Col, Row } from "react-bootstrap";
import AnimatedButton from "./AnimatedButton";
import { useNavigate } from "react-router-dom";
import { Image } from "@jakubkanna/labguy-front-schema/dist/Post.schema";

type Object = {
  media: MediaRef;
  key: Key;
  position: { top: string; left: string };
};

export default function EduArtContent({ data }: { data: (Work | Post)[] }) {
  const [array, setArray] = useState<Object[]>([]);
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(
    null
  );

  const navigate = useNavigate();

  const maxData = 8;
  const delay = 12000;

  const limitedData = useMemo(
    () => data?.slice(0, maxData) || [],
    [data, maxData]
  );

  const getData = useCallback(() => {
    return limitedData
      .filter((item) => item.general?.published)
      .flatMap((item) => {
        if ("media" in item && Array.isArray(item.media) && item.media.length) {
          // Pick two random media items
          const shuffledMedia = [...item.media].sort(() => 0.5 - Math.random());
          const selectedMedia = shuffledMedia.slice(0, 2);

          return selectedMedia.map((media, index) => ({
            media,
            key: `${item.general.title}-${index}-${Date.now()}-${Math.random()}`,
          }));
        } else if ("content" in item && Array.isArray(item.content)) {
          const firstImageBlock = item.content.find(
            (block) =>
              "images" in block &&
              Array.isArray(block.images) &&
              block.images.length > 0
          ) as Image | undefined;

          if (firstImageBlock) {
            // Pick two random images
            const shuffledImages = [...(firstImageBlock.images ?? [])].sort(
              () => 0.5 - Math.random()
            );
            const selectedImages = shuffledImages.slice(0, 2);

            return selectedImages.map((image, index) => ({
              media: image as MediaRef, // Assuming images are compatible with MediaRef
              key: `post-${item.generalId}-${index}`,
            }));
          }
        }
        return [];
      })
      .filter((item) => item !== null) as Object[];
  }, [limitedData]);

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
              key: `${obj.media?.etag}-${Date.now()}-${Math.random()}`,
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
        index * Math.random() * 2000
      );

      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [getData]);

  const handleClick = (label: "art" | "edu") => {
    navigate(label);
  };

  return (
    <div
      className="position-relative w-100  overflow-hidden"
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
            className="position-absolute z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 2, ease: "easeInOut" } }}
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
              style={{ width: "500px", height: "auto" }}
            >
              <MediaComponent media={obj.media} variant="loop" />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
