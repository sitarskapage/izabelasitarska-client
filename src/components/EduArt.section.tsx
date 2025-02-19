import { useMemo, useCallback, useState, useEffect } from "react";
import { Work } from "../../types/Work";
import { useFetchData } from "../hooks/useFetch";
import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";
import { AnimatePresence, motion } from "motion/react";

export default function EduArtContent() {
  const { data } = useFetchData<Work[]>("works?unique=true");

  const imagesPerLayer = 4;
  const totalLayers = 4;
  const maxImages = imagesPerLayer * totalLayers;
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

  const [array, setArray] = useState<{ media: MediaRef; key: string }[]>([]);

  useEffect(() => {
    setArray(getData()); // Initialize the array
  }, [getData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setArray((prev) => {
        if (prev.length === 0) return prev;

        const newArray = [...prev];
        const removedItem = newArray.pop(); // Remove the last item

        // Add it back after 1 second (allow exit animation to play)
        setTimeout(() => {
          setArray((curr) => [removedItem!, ...curr]);
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
          >
            <MediaComponent media={obj.media} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
