import { useCallback, useEffect, useMemo, useState } from "react";
import { Work } from "../../types/Work";
import { useFetchData } from "../hooks/useFetch";
import MediaComponent from "./Media";
import { MediaRef } from "../utils/helpers";

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

  const rotate = () => {
    setArray((prev) => {
      const newArray = [...prev]; // Create a new array to avoid mutation
      const lastItem = newArray.pop(); // Remove the last item from the array
      if (lastItem) {
        newArray.unshift(lastItem); // Add the last item to the front
      }
      return newArray; // Return the new array
    });
  };

  useEffect(() => {
    const data = getData();
    setArray(data); // Initialize the array with the fetched data
  }, [getData]);

  useEffect(() => {
    const interval = setInterval(() => {
      rotate(); // Rotate the array every 3.5 seconds
    }, delay);

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative w-100 h-100 overflow-hidden">
      {/* start with opacity 0 to 1 with 1000 delay */}
      {/* spawn images in random positions but not longer than 20% of the screen width/height */}
      {/* animate randomly every item into top-left bottom-left top-right bottom-right corner */}
      {/* end with opacity 1 to 0 animation at (delay - 1000) */}

      {array.map((obj) => (
        <div
          key={obj.key}
          className="position-absolute"
          style={{
            top: `${50}%`,
            left: `${50}%`,
            transform: "translate(-50%,-50%)",
          }}
        >
          <MediaComponent media={obj.media} />
        </div>
      ))}
    </div>
  );
}
