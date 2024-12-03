import { ReactNode, useState, useEffect } from "react";
import { ScrollContext } from "../ScrollContext";

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;
      setIsBottom(isAtBottom);
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={isBottom}>{children}</ScrollContext.Provider>
  );
}
