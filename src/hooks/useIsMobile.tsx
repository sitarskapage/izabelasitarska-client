import { useWindowSize } from "@react-hook/window-size";

export default function useIsMobile() {
  const [windowWidth] = useWindowSize();

  const isMobile = windowWidth < 768;

  return isMobile;
}
