import { MediaRef } from "../utils/helpers";
import MediaComponent from "./Media";

interface BackgroundProps {
  media: MediaRef;
  isLoop?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ media, isLoop }) => {
  return (
    <div
      id="Background"
      className="video-cover position-absolute top-0 start-0 w-100 h-100 z-n1 p-0 bg-black d-flex flex-column justify-content-center align-items-center"
    >
      <MediaComponent
        media={media}
        variant={isLoop && "loop"}
        className="opacity-75 w-100 h-auto"
      />
    </div>
  );
};

export default Background;
