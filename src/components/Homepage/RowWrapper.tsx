import {
  motion,
  MotionStyle,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import {
  TopToBot,
  containerTransDuration,
} from "../../utils/framerMotionVariants";
import useIsMobile from "../../hooks/useIsMobile";

const RowWrapper = ({
  children,
  delay,
  z,
  position,
  onScrollProgressChange,
  id,
}: {
  children: ReactNode;
  delay?: number;
  z: number;
  position: number;
  onScrollProgressChange?: (progress: number) => void; // Prop type
  id: string;
}) => {
  const styles: { [key: string]: MotionStyle } = {
    row: {
      height: "33.333%",
      overflow: "hidden",
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const isMobile = useIsMobile();

  // Use useMotionValueEvent to notify the parent about scroll progress updates
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (onScrollProgressChange) {
      onScrollProgressChange(latest); // Notify parent
    }
  });

  // Scroll to the desired position when 'position' changes
  useEffect(() => {
    const scrollToProgress = (progress: number) => {
      if (!ref.current) return;

      const element = ref.current;

      if (isMobile) {
        // Horizontal scroll logic for mobile
        const maxScroll = element.scrollWidth - element.clientWidth;
        element.scrollLeft = maxScroll * progress;
      } else {
        // Vertical scroll logic for desktop
        const maxScroll = element.scrollHeight - element.clientHeight;
        element.scrollTop = maxScroll * progress;
      }
    };

    scrollToProgress(position); // Sync scroll position with parent prop
  }, [isMobile, position]);

  return (
    <motion.div
      key={id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={TopToBot}
      transition={{ duration: delay || containerTransDuration }}
      style={styles.row}
      className={`row border-bottom border-dark  bg-light z-${z} position-relative`}
      ref={ref}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export default RowWrapper;
