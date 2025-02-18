import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";

interface BackgroundProps {
  media?: MediaRef;
}

const Background: React.FC<BackgroundProps> = ({ media }) => {
  if (!media) return null;

  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 z-n1 p-0">
      <MediaComponent media={media} />
    </div>
  );
};

export default Background;
