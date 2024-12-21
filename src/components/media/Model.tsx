import "@google/model-viewer";
import { ThreedRef } from "@jakubkanna/labguy-front-schema";
import { useState, useEffect, useRef } from "react";
import { ModelViewer } from "../../../types/model-viewer";

export default function Model({ threedref }: { threedref: ThreedRef }) {
  const [src, setSrc] = useState<string | undefined>(threedref?.url);
  const [valid, setIsValid] = useState<boolean>(true);
  const [controls, setControls] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const modelViewerRef = useRef<ModelViewer | undefined>(undefined);

  useEffect(() => {
    console.log("src", src);
    if (src) {
      // Validate the image URL
      fetch(src)
        .then((response) => {
          if (response.ok) {
            // If the response is OK, set the image source
            setSrc(src);
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => {
          setIsValid(false);
        });
    }
  }, [src]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      const handleProgress = ((
        event: CustomEvent<{ totalProgress: number }>
      ) => {
        console.log("Progress event:", event.detail);
        const progress = event.detail.totalProgress || 0;
        setProgress(progress);
      }) as EventListener;

      // Add both progress and load events
      (modelViewer as unknown as HTMLElement).addEventListener(
        "progress",
        handleProgress
      );
      (modelViewer as unknown as HTMLElement).addEventListener("load", () =>
        setProgress(100)
      );

      return () => {
        (modelViewer as unknown as HTMLElement).removeEventListener(
          "progress",
          handleProgress
        );
        (modelViewer as unknown as HTMLElement).removeEventListener(
          "load",
          () => setProgress(100)
        );
      };
    }
  }, []);

  const handleFullscreen = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      if (document.fullscreenElement) {
        setControls(false);
        document.exitFullscreen();
      } else if ((modelViewer as unknown as HTMLElement).requestFullscreen) {
        setControls(true);
        (modelViewer as unknown as HTMLElement).requestFullscreen();
      }
    }
  };

  return (
    valid && (
      <div>
        <model-viewer
          ref={modelViewerRef}
          src={src}
          id={"model-viewer-" + threedref.public_id}
          class="model-viewer"
          autoplay
          camera-controls={controls ? true : undefined}
          onError={(e: unknown) => console.error("Error loading model:", e)}
          alt={""}
          style={{
            backgroundColor: threedref.backgroundColor,
          }}
          poster={threedref.poster?.url as string}
          exposure="0.75"
        >
          <div slot="progress-bar" className="custom-progress-bar">
            <div
              className="progress-bar-inner bg-dark"
              style={{
                width: `${progress * 100}%`,
                height: "2px",
                display: `${progress == 1 ? "none" : "block"}`,
              }}
            ></div>
          </div>
          <div className="position-absolute bottom-0 end-0 m-2 d-flex">
            <button onClick={handleFullscreen} className="">
              <i className="bi bi-arrows-fullscreen"></i>
            </button>
          </div>
        </model-viewer>
      </div>
    )
  );
}
