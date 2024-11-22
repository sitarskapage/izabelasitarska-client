import React, { useState, useEffect } from "react";

interface AnimatedTitleProps {
  title: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title }) => {
  const [oldTitle, setOldTitle] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string[]>([]);

  // Generate a random letter

  const getRandomLetter = () => {
    const isUppercase = Math.random() > 0.5; // Randomly choose between uppercase and lowercase
    const charCodeStart = isUppercase ? 65 : 97; // 65 is 'A', 97 is 'a'
    const charCodeEnd = isUppercase ? 90 : 122; // 90 is 'Z', 122 is 'z'

    const randomCharCode =
      Math.floor(Math.random() * (charCodeEnd - charCodeStart + 1)) +
      charCodeStart;
    return String.fromCharCode(randomCharCode);
  };

  // Handle updates to the title and trigger animation
  useEffect(() => {
    if (title !== oldTitle) {
      // Update oldTitle to the new title
      setOldTitle(title);

      // Initialize displayedTitle with empty strings
      const initialDisplayedTitle = oldTitle.split("");
      setDisplayedTitle(initialDisplayedTitle);

      // Animate each letter in the title
      title.split("").forEach((char, index) => {
        // Set the timeout for each letter to animate it
        setTimeout(() => {
          // Show a sequence of random letters before showing the correct letter
          let currentLetter = getRandomLetter();
          const maxRandomSteps = 3;

          for (let i = 0; i < maxRandomSteps; i++) {
            setTimeout(() => {
              currentLetter = getRandomLetter();
              setDisplayedTitle((prevTitle) => {
                const updatedTitle = [...prevTitle];
                updatedTitle[index] = currentLetter;
                return updatedTitle;
              });
            }, i * 50); //  delay between each random letter
          }

          // Finally, reveal the correct letter after the random ones
          setTimeout(() => {
            setDisplayedTitle((prevTitle) => {
              const updatedTitle = [...prevTitle];
              updatedTitle[index] = char; // Set the final correct character
              return updatedTitle;
            });
          }, maxRandomSteps * 100);
        }, index * 50); //  delay for each letter to start animating
      });
    }
  }, [title, oldTitle]);

  return <>{displayedTitle.join("")}</>;
};

export default AnimatedTitle;
