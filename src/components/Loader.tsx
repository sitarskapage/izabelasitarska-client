import React, { useState, useEffect } from "react";

// Define the props interface
interface AsciiLoaderProps {
  className?: string;
}

const AsciiLoader: React.FC<AsciiLoaderProps> = ({ className }) => {
  // Define the loader frames
  const frames: string[] = ["|", "\\", "--", "/"];

  // State to track the current frame, initialized to 0
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  // State to control whether the loader should be visible
  const [showLoader, setShowLoader] = useState<boolean>(false);

  // Effect to handle the interval logic for the loader frames
  useEffect(() => {
    // Only set up the interval if the loader is visible
    if (showLoader) {
      const intervalId = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
      }, 140); // Change frame every 140ms

      // Cleanup interval on component unmount or when loader visibility changes
      return () => clearInterval(intervalId);
    }
  }, [showLoader, frames.length]);

  // Effect to manage the 1.5-second delay before showing the loader
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowLoader(true);
    }, 1500); // Delay of 1.5 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      style={{ fontSize: "2rem", fontFamily: "monospace" }}
      className={className}
    >
      {showLoader && frames[currentFrame]}
    </div>
  );
};

export default AsciiLoader;
