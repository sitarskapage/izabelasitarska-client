import {
  motion,
  MotionStyle,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ReactNode, useRef } from "react";
import {
  containerTopToBottom,
  containerTransDuration,
} from "../../utils/framerMotionVariants";

const RowWrapper = ({
  children,
  delay,
  z,
  position,
}: {
  children: ReactNode;
  delay?: number;
  z: number;
  position: number;
}) => {
  const styles: { [key: string]: MotionStyle } = {
    row: {
      height: "33.333%",
      overflowX: "hidden",
      overflowY: "scroll",
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });

  // Use useMotionValueEvent to log scroll updates
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll progress:", latest);
  });

  // Function to programmatically set scroll position
  const scrollToProgress = (progress: number) => {
    if (!ref.current) return;

    const element = ref.current;
    const maxScroll = element.scrollHeight - element.clientHeight;
    element.scrollTop = maxScroll * progress;
  };

  return (
    <motion.div
      key={z}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerTopToBottom}
      transition={{ duration: delay || containerTransDuration }}
      style={styles.row}
      className={`row border-bottom border-dark  bg-light z-${z} position-relative`}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default RowWrapper;
