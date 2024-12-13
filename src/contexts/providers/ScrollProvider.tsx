import { ReactNode, useCallback, useEffect, useState } from "react";
import { ScrollContext } from "../ScrollContext";
import { useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const [isBottom, setIsBottom] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [isFullPage, setIsFullPage] = useState(false);
  const { pathname } = useLocation();

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  // Handle wheel event and track scroll position
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const scrollDeltaY = event.deltaY;

      if (scrollYProgress.get() >= 0.99 && pathname !== "/") {
        // Track scroll count when near bottom of the page
        if (scrollDeltaY > 0) {
          setScrollCount((prevCount) => prevCount + 1);
        } else if (scrollDeltaY < 0) {
          setScrollCount((prevCount) => prevCount - 1);
        }

        // Update isBottom state after scroll count reaches threshold
        if (scrollCount >= 3) {
          setIsBottom(true);
        }
        if (scrollCount <= 0) {
          setIsBottom(false);
        }
      } else {
        // Reset scroll count when not at bottom of the page
        setScrollCount(0);
        setIsBottom(false);
      }
    },
    [scrollYProgress, scrollCount, pathname]
  );

  // Sync scroll progress with page height changes
  useEffect(() => {
    if (isFullPage) scrollYProgress.set(1);
  }, [isFullPage, scrollYProgress]);

  useEffect(() => {
    const wheelListener = (event: WheelEvent) => handleWheel(event);
    document.addEventListener("wheel", wheelListener);
    return () => {
      document.removeEventListener("wheel", wheelListener);
    };
  }, [handleWheel]);

  // Check if the page is full-height and update state
  const checkIfFullPage = () => {
    setIsFullPage(window.innerHeight === document.body.offsetHeight);
  };

  useEffect(() => {
    checkIfFullPage();
    window.addEventListener("resize", checkIfFullPage);
    return () => {
      window.removeEventListener("resize", checkIfFullPage);
    };
  }, [pathname]);

  // Reset scroll states on route change
  useEffect(() => {
    setIsBottom(false);
    setScrollCount(0);
  }, [pathname]);

  return (
    <ScrollContext.Provider value={isBottom}>{children}</ScrollContext.Provider>
  );
}
