import { useEffect, useState } from "react";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { getImageAttributes } from "../../utils/utils";

interface ImageProps {
  imageref: ImageRefSchema;
  className?: string;
  fallbackUrl?: string; // Optional custom fallback image URL
}

export default function Image({ imageref, className }: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>("");
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  const { src, srcSet, sizes, alt } = imageref
    ? getImageAttributes(imageref)
    : { src: "", srcSet: "", sizes: "", alt: "" };

  useEffect(() => {
    if (src) {
      // Validate the image URL
      fetch(src)
        .then((response) => {
          if (response.ok) {
            setImgSrc(src);
            setIsImageValid(true);
          } else {
            setIsImageValid(false);
          }
        })
        .catch(() => {
          setIsImageValid(false);
        });
    }
  }, [src]);

  if (!isImageValid) {
    return;
  }

  return (
    <>
      <img
        src={imgSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={className || "img-fluid"}
        loading="lazy"
      />
    </>
  );
}
