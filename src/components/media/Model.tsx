import "@google/model-viewer";
import { RGBA } from "@google/model-viewer";
import { useState, useEffect } from "react";

export interface ModelSchema {
  src: string;
  backgroundColor?: RGBA;
  exposure?: string;
  autoplay: boolean;
}

export default function Model() {
  const [src, setSrc] = useState<string>(
    `${
      import.meta.env.BASE_URL
    }/models/intenstine/michelin-intenstine_jakubkanna.gltf`
  );
  const [valid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
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
        style={{ backgroundColor: "blue" }}
        camera-controls
        poster=""
        exposure="0.75"
      ></model-viewer>
    )
  );
}
