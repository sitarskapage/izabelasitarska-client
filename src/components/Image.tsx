import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

// Define global sizes
const sizes = {
  SMALL: 400,
  MEDIUM: 800,
  BIG: 1600,
  FULL: 2160,
};

// Function to generate a Cloudinary URL with a specific width
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

// Function to generate srcSet for different sizes
function getSrcSet(public_id: string) {
  return Object.values(sizes)
    .map((width) => `${getCldUrl(public_id, width)} ${width}w`)
    .join(", ");
}

// Function to get the image URL and attributes based on whether it's a Cloudinary image
function getImageAttributes(image: ImageRefSchema) {
  const { cld_url, public_id } = image;

  if (cld_url && public_id) {
    return {
      src: getCldUrl(public_id, sizes.MEDIUM), // Default width
      srcSet: getSrcSet(public_id),
      sizes: `(max-width: 600px) ${sizes.SMALL}px, (max-width: 1200px) ${sizes.MEDIUM}px, (max-width: 1600px) ${sizes.BIG}px, ${sizes.FULL}px`,
      alt: image.description,
    };
  }

  // Handle non-Cloudinary images
  return {
    src: "",
    srcSet: "",
    sizes: "",
    alt: "",
  };
}

interface ImageProps {
  image: ImageRefSchema;
  className?: string;
}

export default function Image({ image, className }: ImageProps) {
  const { src, srcSet, sizes, alt } = getImageAttributes(image);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      className={className || "img-fluid"}
    />
  );
}
