// there is a problem that it calculates footer height before it finished animating

import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

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

    // Update padding whenever window dimensions change
    updatePadding();
  }, [windowWidth, windowHeight]);

  return padding;
};

export default useCalculatePadding;
