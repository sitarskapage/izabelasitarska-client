import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AnimatedButton({ label }: { label: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (label.toLowerCase() === "art") {
      navigate("/art");
    } else {
      navigate("/education");
    }
  };

  return (
    <motion.button
      className="position-relative overflow-hidden py-2 px-3 text-dark border border-dark font-semibold rounded-lg fs-2"
      whileHover="hover"
      style={{ position: "relative", overflow: "hidden" }} // Ensure correct positioning
      onClick={handleClick}
    >
      {/* Background Animation */}
      <motion.span
        className="position-absolute bg-dark border border-light"
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        initial={{ y: "-100%" }}
        variants={{
          hover: { y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
        }}
      />
      {/* Button Text */}
      <motion.span
        className="position-relative z-2 d-block"
        variants={{
          hover: {
            color: "white",
            transition: { duration: 0.3 },
          },
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
