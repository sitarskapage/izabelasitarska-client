import { useState, useEffect } from "react";

interface Padding {
  paddingTop: number;
  paddingBottom: number;
}

const useCalculatePadding = (): Padding => {
  const [padding, setPadding] = useState<Padding>({
    paddingTop: 0,
    paddingBottom: 0,
  });

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

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    const headerHeight = getElementHeight(header);
    const footerHeight = getElementHeight(footer);

    setPadding({
      paddingTop: headerHeight,
      paddingBottom: footerHeight,
    });
  }, []);

  return padding;
};

export default useCalculatePadding;
