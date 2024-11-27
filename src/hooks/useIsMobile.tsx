import { useWindowSize } from "@react-hook/window-size";
import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [windowWidth] = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth]);

  return isMobile;
}
