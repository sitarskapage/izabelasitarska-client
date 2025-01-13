import Image from "./media/Image";
import Video from "./media/Video";
import { isImage, isVideo, MediaRef } from "../utils/helpers";
import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";

interface BackgroundProps {
  media?: MediaRef;
}

const Background: React.FC<BackgroundProps> = ({ media }) => {
  if (!media) return null;

  if (isImage(media)) {
    return (
      <Image
        className="w-100 h-100 object-fit-cover"
        imageref={media as ImageRefSchema}
      />
    );
  }

  if (isVideo(media)) {
    return <Video videoref={media as VideoRefSchema} />;
  }

  return null;
};

export default Background;
