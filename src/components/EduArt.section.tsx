import { useMemo, useCallback, useState, useEffect } from "react";
import { Work } from "../../types/Work";
import { useFetchData } from "../hooks/useFetch";
import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";
import { AnimatePresence, motion } from "motion/react";

export default function EduArtContent() {
  const { data } = useFetchData<Work[]>("works?unique=true");

  // const imagesPerLayer = 4;
  // const totalLayers = 4;
  const maxImages = 16;
  const delay = 3500;

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
    top: `${Math.random() * 80 + 10}%`, // Randomly position between 10% and 90% (80% range)
    left: `${Math.random() * 80 + 10}%`, // Randomly position between 10% and 90% (80% range)
  });

  const getRandomCorner = () => {
    const corners = [
      { top: "0%", left: "0%" }, // Top-left
      { top: "0%", left: "100%" }, // Top-right
      { top: "100%", left: "0%" }, // Bottom-left
      { top: "100%", left: "100%" }, // Bottom-right
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  };

  const [array, setArray] = useState<
    { media: MediaRef; key: string; position: { top: string; left: string } }[]
  >([]);

  useEffect(() => {
    setArray(
      getData().map((item) => ({ ...item, position: getRandomPosition() }))
    );
  }, [getData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setArray((prev) => {
        if (prev.length === 0) return prev;

        const newArray = [...prev];
        const removedItem = newArray.pop(); // Remove the last item

        // Add it back after 1 second (allow exit animation to play)
        setTimeout(() => {
          setArray((curr) => [
            { ...removedItem!, position: getRandomPosition() },
            ...curr,
          ]);
        }, 1000);

        return newArray;
      });
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative w-100 h-100 overflow-hidden">
      {/* implement framer-motion animation */}
      {/* start with opacity 0 to 1 with 1000 delay */}
      {/* spawn images in random positions but not longer than 20% of the screen width/height */}
      {/* animate randomly every item into top-left bottom-left top-right bottom-right corner */}
      {/* scale images to max 200 during animation */}
      {/* end with opacity 1 to 0 animation at (delay - 1000) */}
      <AnimatePresence>
        {array.map((obj) => (
          <motion.div
            key={obj.key}
            className="position-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              top: obj.position.top,
              left: obj.position.left,
              transform: "translate(-50%, -50%)",
              maxWidth: "20%",
            }}
          >
            <MediaComponent media={obj.media} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
