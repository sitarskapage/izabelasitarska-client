import AnimatedButton from "./AnimatedButton";

const PortfolioButton = ({ url }: { url?: string | null }) => {
  function handleClick() {
    if (url) {
      // If a portfolio PDF URL is available, open it in a new tab
      window.open(url, "_blank");
    } else {
      // If no PDF is available, navigate to the contact tab
      window.open("mailto:sitarskapage@gmail.com", "_blank");
    }
  }

  return (
    <AnimatedButton
      label={url ? "Download (PDF)" : "Request PDF"}
      onClick={handleClick}
    />
  );
};

export default PortfolioButton;
