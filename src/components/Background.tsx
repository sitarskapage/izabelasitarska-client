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
      className="position-absolute top-50 start-50 translate-middle w-100 h-100 z-n1 p-0 bg-black"
    >
      <MediaComponent
        media={media}
        variant={isLoop && "loop"}
        className="opacity-75"
      />
    </div>
  );
};

export default Background;
