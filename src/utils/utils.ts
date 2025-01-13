import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";

// Global sizes for responsive images
const sizes = {
  SMALL: 400,
  MEDIUM: 800,
  BIG: 1600,
  FULL: 2160,
};

// Cloudinary URL generator with a specific width
function getCldUrl(public_id: string, width: number) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLD_CLOUD_NAME,
    },
  });

  const myImage = cld.image(public_id);
  myImage.resize(scale().width(width));
  return myImage.toURL();
}

// Generate srcSet for responsive image loading
function getSrcSet(public_id: string) {
  return Object.values(sizes)
    .map((width) => `${getCldUrl(public_id, width)} ${width}w`)
    .join(", ");
}

// Get Image attributes based on Cloudinary availability
export function getImageAttributes(image: ImageRefSchema) {
  const { public_id } = image;

  if (public_id) {
    return {
      src: getCldUrl(public_id, sizes.MEDIUM),
      srcSet: getSrcSet(public_id),
      sizes: `(max-width: 600px) ${sizes.SMALL}px, (max-width: 1200px) ${sizes.MEDIUM}px, (max-width: 1600px) ${sizes.BIG}px, ${sizes.FULL}px`,
      alt: image.description || "Image",
    };
  }

  // Non-Cloudinary image or missing data fallback
  return {
    src: "",
    srcSet: "",
    sizes: "",
    alt: "",
  };
}
export interface Padding {
  paddingTop: number;
  paddingBottom: number;
}

export const getPadding = (): Padding => {
  const getElementHeight = (element: HTMLElement | null): number => {
    if (!element) return 0;

    const style = window.getComputedStyle(element);
    return (
      element.clientHeight +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom) +
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom)
    );
  };

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  return {
    paddingTop: getElementHeight(header),
    paddingBottom: getElementHeight(footer),
  };
};
