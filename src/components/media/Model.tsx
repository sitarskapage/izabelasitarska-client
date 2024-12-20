import "@google/model-viewer";
import { ThreedRef } from "@jakubkanna/labguy-front-schema";
import { useState, useEffect } from "react";

export default function Model({ threedref }: { threedref: ThreedRef }) {
  const [src, setSrc] = useState<string | undefined>(threedref?.url);
  const [valid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    console.log("src", src);
    if (src) {
      // Validate the image URL
      fetch(src)
        .then((response) => {
          if (response.ok) {
            // If the response is OK, set the image source
            setSrc(src);
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => {
          setIsValid(false);
        });
    }
  }, [src]);

  return (
    valid && (
      <model-viewer
        src={src}
        id={src}
        autoplay
        onError={(e: unknown) => console.error("Error loading model:", e)}
        alt={""}
        style={{
          backgroundColor: threedref.backgroundColor,
          minHeight: "800px",
        }}
        poster={threedref.poster?.url as string}
        exposure="0.75"
      ></model-viewer>
    )
  );
}
