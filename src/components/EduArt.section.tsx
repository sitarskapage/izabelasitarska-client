import { useMemo, useCallback, useState, useEffect, Key } from "react";
import { Work } from "../../types/Work";
import { useFetchData } from "../hooks/useFetch";
import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";
import { AnimatePresence, motion } from "motion/react";
type Object = {
  media: MediaRef;
  key: Key;
  position: { top: string; left: string };
};

export default function EduArtContent() {
  const { data } = useFetchData<Work[]>("works?unique=true");
  const [array, setArray] = useState<Object[]>([]);

  // const imagesPerLayer = 4;
  // const totalLayers = 4;
  const maxImages = 16;
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
    top: `${Math.random() * 80 + 10}%`, // Randomly position between 10% and 90% (80% range)
    left: `${Math.random() * 80 + 10}%`, // Randomly position between 10% and 90% (80% range)
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

    return () => timeoutIds.forEach((id) => clearTimeout(id)); // Cleanup timeouts on unmount
  }, [getData]);

  return (
    <div className="position-relative w-100 h-100 overflow-hidden">
      <AnimatePresence>
        {array.map((obj) => (
          <motion.div
            key={obj.key}
            className="position-absolute"
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1, ease: "easeInOut" } }}
            style={{
              top: obj.position.top,
              left: obj.position.left,
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "auto",
            }}
            onAnimationComplete={() => onComplete(obj)}
          >
            {" "}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 2 }}
              transition={{ scale: { duration: delay / 1000, ease: "easeIn" } }}
              style={{
                width: "500px",
                height: "auto",
              }}
            >
              <MediaComponent media={obj.media} />{" "}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
