import { memo, useEffect, useState } from "react";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { getImageAttributes } from "../../utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { containerSizeMiddle } from "../../utils/framerMotionVariants";

interface ImageProps {
  imageref: ImageRefSchema;
  className?: string;
  fallbackUrl?: string; // Optional custom fallback image URL
}

const ImageComp = memo(
  ({ imageref, className }: ImageProps) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const [isImageValid, setIsImageValid] = useState<boolean>(true);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false); // Track image load state

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
          setIsImageLoaded(true); // Mark as loaded when the image is ready
        };

        img.onerror = () => {
          setIsImageValid(false); // Set to false if there is an error loading the image
          setIsImageLoaded(true); // Still set it as loaded so that we can render fallback if necessary
        };
      }
    }, [src]); // Re-run the effect when `src` changes

    if (!isImageValid) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          {/* Fallback content when the image is invalid */}
          <p>Image failed to load</p>
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        {isImageLoaded && (
          <motion.img
            key={src}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerSizeMiddle}
            transition={{ duration: 0.66 }}
            src={imgSrc} // Use the preloaded `imgSrc` for stable display
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            className={className || "img-fluid"}
            loading="lazy"
          />
        )}
      </AnimatePresence>
    );
  },
  (prevProps, nextProps) => {
    // Memoize based on the `imageref` prop change
    return prevProps.imageref.src !== nextProps.imageref.src;
  }
);

export default ImageComp;
