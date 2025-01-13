const TopToBot = {
  initial: { y: "-100dvh" },
  animate: { y: 0 },
  exit: { y: "100dvh" },
};

const containerSizeMiddle = {
  initial: { clipPath: "inset(50% 0% 50% 0%)" }, // Initially clip the top and bottom, height is 0
  animate: { clipPath: "inset(0% 0% 0% 0%)" }, // Animate to reveal the full height (no clipping)
  exit: { clipPath: "inset(50% 0% 50% 0%)" }, // Keep clipped when exiting
};

const containerTransDuration = 0.44;

export { TopToBot, containerSizeMiddle, containerTransDuration };
