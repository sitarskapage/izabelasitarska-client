import Image from "./media/Image";
import { Link } from "react-router-dom";
import { Work } from "../pages/Works";
import Video from "./media/Video";
import { isImage, isVideo, is3d } from "../utils/helpers";
import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import Model from "./media/Model";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

export default function WorkCard({ work }: CardProps) {
  const { general, year, media } = work;
  const { title, slug } = general;
  const [fontSizeClass, setFontSizeClass] = useState("");
  const isMobile = useIsMobile();

  if (!media) return;

  const image = isImage(media[0]) && media[0];
  const video = isVideo(media[0]) && media[0];
  const threed = is3d(media[0]) && media[0];

  return (
    <Link
      to={"/works/" + slug}
      className={fontSizeClass + ` bg-black`}
      onMouseOver={() => setFontSizeClass("fw-bolder")}
      onMouseOut={() => setFontSizeClass("")}
    >
      <div className="h-100">
        {image && (
          <Image
            imageref={image}
            className="z-0 h-100 mw-100 position-absolute top-0 start-50 translate-middle-x"
          />
        )}
        {video && (
          <>
            <div className="z-0 position-relative">
              <Video videoref={video} playerProps={{ light: true }}></Video>
            </div>{" "}
            <div className="z-1 w-100 h-100 position-absolute top-0"></div>
          </>
        )}
        {threed &&
          (threed.poster ? (
            <Image
              imageref={threed.poster as ImageRefSchema}
              className="z-0 h-100 mw-100 position-absolute top-0 start-50 translate-middle-x"
            />
          ) : (
            <Model threedref={threed} />
          ))}
        {!isMobile && (
          <div className="position-absolute bottom-0 start-50 translate-middle-x text-outline">
            <div className="text-decoration-none text-center">
              <span className="fst-italic">{title}</span>
              {year && <span>{", " + year}</span>}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
