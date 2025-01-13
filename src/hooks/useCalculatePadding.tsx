import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import { containerTransDuration } from "../utils/framerMotionVariants";

interface Padding {
  paddingTop: number;
  paddingBottom: number;
}

const useCalculatePadding = (): Padding => {
  const [padding, setPadding] = useState<Padding>({
    paddingTop: 0,
    paddingBottom: 0,
  });

  // Get current window width and height
  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    const getElementHeight = (element: HTMLElement | null): number => {
      if (!element) return 0;
      const style = window.getComputedStyle(element);
      return (
        element.clientHeight +
        parseFloat(style.marginTop) +
        parseFloat(style.marginBottom) +
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom)
      );
    };

    const updatePadding = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      const headerHeight = getElementHeight(header);
      const footerHeight = getElementHeight(footer);

      setPadding({
        paddingTop: headerHeight,
        paddingBottom: footerHeight,
      });
    };

    // footer might be 'open' when navigating to the other page so the calculation on the target page might be wrong
    //solving it by adding slight delay because there is framer motion transition animation anyway
    const timer = setTimeout(updatePadding, containerTransDuration * 1000); // Delay for animation duration

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [windowWidth, windowHeight]);

  return padding;
};

export default useCalculatePadding;
