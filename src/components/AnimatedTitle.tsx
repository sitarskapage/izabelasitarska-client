import React, { useState, useEffect, useCallback, memo } from "react";

interface AnimatedTitleProps {
  title: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = memo(({ title }) => {
  const [displayState, setDisplayState] = useState({
    oldTitle: "",
    displayedTitle: [] as string[],
  });

  const getRandomLetter = useCallback(() => {
    const isUppercase = Math.random() > 0.5;
    const charCodeStart = isUppercase ? 65 : 97;
    const charCodeEnd = isUppercase ? 90 : 122;
    return String.fromCharCode(
      Math.floor(Math.random() * (charCodeEnd - charCodeStart + 1)) +
        charCodeStart
    );
  }, []);

  useEffect(() => {
    if (title === displayState.oldTitle) return;

    const timeouts: NodeJS.Timeout[] = [];
    const maxRandomSteps = 3;
    const letterDelay = 50;
    const randomLetterDelay = 50;

    setDisplayState(() => ({
      oldTitle: title,
      displayedTitle: Array(title.length).fill(""),
    }));

    title.split("").forEach((char, index) => {
      const mainTimeout = setTimeout(() => {
        for (let i = 0; i < maxRandomSteps; i++) {
          const randomTimeout = setTimeout(() => {
            setDisplayState((prev) => {
              const newTitle = [...prev.displayedTitle];
              newTitle[index] = getRandomLetter();
              return { ...prev, displayedTitle: newTitle };
            });
          }, i * randomLetterDelay);
          timeouts.push(randomTimeout);
        }

        const finalTimeout = setTimeout(() => {
          setDisplayState((prev) => {
            const newTitle = [...prev.displayedTitle];
            newTitle[index] = char;
            return { ...prev, displayedTitle: newTitle };
          });
        }, maxRandomSteps * randomLetterDelay);
        timeouts.push(finalTimeout);
      }, index * letterDelay);

      timeouts.push(mainTimeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [title, getRandomLetter, displayState.oldTitle]);

  return <>{displayState.displayedTitle.join("")}</>;
});

AnimatedTitle.displayName = "AnimatedTitle";

export default AnimatedTitle;
