const TopToBot = {
  initial: { y: "-100dvh" },
  animate: { y: 0 },
  exit: { y: "100dvh" },
};
const BotToTop = {
  initial: { y: "-100dvh" },
  animate: { y: 0 },
  exit: { y: "100dvh" },
};
const containerSizeMiddle = {
  initial: { clipPath: "inset(50% 0% 50% 0%)" }, // Initially clip the top and bottom, height is 0
  animate: { clipPath: "inset(0% 0% 0% 0%)" }, // Animate to reveal the full height (no clipping)
  exit: { clipPath: "inset(50% 0% 50% 0%)" }, // Keep clipped when exiting
};

const containerTransDuration = 0.5;

const Yvariants = {
  hidden: (direction: number) => ({
    y: direction === 1 ? "100vh" : "-100vh", // Enter from bottom or top
    opacity: 0,
  }),
  visible: {
    y: 0, // Centered when visible
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction === 1 ? "-100vh" : "100vh", // Exit to top or bottom
    opacity: 0,
  }),
};

export {
  TopToBot,
  BotToTop,
  containerSizeMiddle,
  containerTransDuration,
  Yvariants,
};
