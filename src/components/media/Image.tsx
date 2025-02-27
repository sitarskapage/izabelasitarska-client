import { useEffect, useState } from "react";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { getImageAttributes } from "../../utils/utils";

interface ImageProps {
  imageref: ImageRefSchema;
  className?: string;
  fallbackUrl?: string; // Optional custom fallback image URL
}

const ImageComp = ({ imageref, className }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  const { src, srcSet, sizes, alt } = imageref
    ? getImageAttributes(imageref)
    : { src: "", srcSet: "", sizes: "", alt: "" };

  // Preload the image
  useEffect(() => {
    if (src) {
      const img = new Image(); // Create a new Image object
      img.src = src; // Set the source to the image URL

      img.onload = () => {
        setImgSrc(src); // Set the image src once it's fully loaded
        setIsImageValid(true);
      };

      img.onerror = () => {
        setIsImageValid(false); // Set to false if there is an error loading the image
      };
    }
  }, [src]); // Re-run the effect when `src` changes

  if (!isImageValid) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 600 }}
      >
        {/* Fallback content when the image is invalid */}
        <p>Image failed to load</p>
      </div>
    );
  }

  return (
    <img
      key={src}
      src={imgSrc} // Use the preloaded `imgSrc` for stable display
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className || "img-fluid"}
      loading="lazy"
    />
  );
};

export default ImageComp;
