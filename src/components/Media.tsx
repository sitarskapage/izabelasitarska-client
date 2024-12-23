import { is3d, isImage, isVideo, MediaRef } from "../utils/helpers";
import Image from "./media/Image";
import Model from "./media/Model";
import Video from "./media/Video";

interface MediaProps {
  media: MediaRef;
  className?: string;
}

export default function MediaComponent({ media, className }: MediaProps) {
  // Early return if no media is provided
  if (!media || media.length === 0) return;

  switch (true) {
    case isImage(media):
      return <Image imageref={media} className={className} />;
    case isVideo(media):
      return <Video videoref={media} />;
    case is3d(media):
      return <Model threedref={media} controls />;
    default:
      return <p>Unsupported media type.</p>;
  }
}
