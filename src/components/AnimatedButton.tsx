import { motion } from "framer-motion";

export default function AnimatedButton({
  label,
  onClick,
  variant = [], // Default to an empty array if no variant is passed
}: {
  label: string;
  onClick: () => void;
  variant?: string[]; // Accept an array of variant names
}) {
  // Check if specific variants are included
  const isSmall = variant.includes("small");
  const isWhite = variant.includes("white");

  return (
    <motion.button
      className={`${
        isWhite ? "bg-transparent" : "bg-light"
      } position-relative overflow-hidden py-2 px-3 font-semibold rounded-lg ${isSmall ? "fs-6" : "fs-2"} border ${
        isWhite ? "border-light text-light" : "border-dark  text-dark"
      }`}
      whileHover="hover"
      style={{ position: "relative", overflow: "hidden" }} // Ensure correct positioning
      onClick={onClick}
    >
      {/* Background Animation */}
      <motion.span
        className={`position-absolute ${
          isWhite ? "border-dark" : "border-light"
        } ${isWhite ? "bg-light" : "bg-dark"}`}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        initial={{ y: "-100%" }}
        variants={{
          hover: {
            y: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      />
      {/* Button Text */}
      <motion.span
        className="position-relative z-2 d-block"
        variants={{
          hover: {
            color: isWhite ? "black" : "white",
            transition: { duration: 0.3 },
          },
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
