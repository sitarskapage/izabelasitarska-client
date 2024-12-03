import React, { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import RowWrapper from "../../components/Homepage/RowWrapper";
import useIsMobile from "../../hooks/useIsMobile";

function Homepage() {
  const styles: { [key: string]: React.CSSProperties } = {
    largeText: {
      fontSize: "35vh",
      lineHeight: 1,
      fontWeight: 700,
      wordWrap: "break-word",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
  };

  const isMobile = useIsMobile();
  const colClass =
    "d-flex text-uppercase text-wrap gap-5 " +
    (isMobile ? "text-nowrap" : "flex-column");

  const [scrollProgress, setScrollProgress] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
  });
  const [activeRow, setActiveRow] = useState(0);
  const smoothAmount = isMobile ? 1500 : 750;

  // Helper function to prevent scrolling overflow
  const preventOverflow = (progress: number) =>
    Math.max(0, Math.min(1, progress));

  const updateScrollProgress = useCallback(
    (delta: number) => {
      const clampedDelta = Math.max(
        -smoothAmount,
        Math.min(smoothAmount, delta)
      );
      setScrollProgress((prev) => {
        const currentProgress = prev[activeRow] || 0;
        let newProgress = currentProgress + clampedDelta / smoothAmount;

        // Ensure value stays between 0 and 1
        newProgress = preventOverflow(newProgress);

        console.log("Progress:", newProgress);

        // Handle row transition logic (move to next or previous row)
        if (newProgress >= 0.99 && activeRow < 2) {
          setActiveRow(activeRow + 1);
          return { ...prev, [activeRow]: 1 }; // Ensure current row completes
        } else if (newProgress <= 0.01 && activeRow > 0) {
          setActiveRow(activeRow - 1);
          return { ...prev, [activeRow]: 0 }; // Ensure current row resets
        }

        return {
          ...prev,
          [activeRow]: newProgress,
        };
      });
    },
    [activeRow, smoothAmount]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const scrollDelta = event.deltaY + event.deltaX;
      updateScrollProgress(scrollDelta);
    },
    [updateScrollProgress]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const touchStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const touchEnd = {
          x: moveEvent.touches[0].clientX,
          y: moveEvent.touches[0].clientY,
        };

        // Calculate the vertical swipe distance
        const deltaY = (touchStart.y - touchEnd.y) * 0.1;

        updateScrollProgress(deltaY); // Update scroll progress
      };

      const handleTouchEnd = () => {
        // Clean up listeners after the touch ends
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      // Add listeners for touch move and touch end
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [updateScrollProgress]
  );

  useEffect(() => console.log("ACTIVEROW:", activeRow), [activeRow]);

  useEffect(() => {
    const wheelListener = (event: WheelEvent) => handleWheel(event);
    document.addEventListener("wheel", wheelListener);
    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("wheel", wheelListener);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleWheel, handleTouchStart]);

  // Sentence data
  const sentence1 = ["Where", "are", "we", "going?"];
  const sentence2 = ["What", "is", "adrenaline", "today?"];
  const sentence3 = ["Can", "riding", "a bike", "be an art?"];

  return (
    <Col xs={12} style={styles.container}>
      {/* Where are we going? */}
      <RowWrapper
        delay={0.183}
        z={2}
        position={scrollProgress[0]}
        id="0"
        onScrollProgressChange={(progress) =>
          setScrollProgress((prev) => ({ ...prev, 0: progress }))
        }
      >
        <Col xs={12} className={colClass} style={styles.largeText}>
          {sentence1.map((val, index) => (
            <span key={index}>{val}</span>
          ))}
        </Col>
      </RowWrapper>
      {/* What is adrenaline today? */}
      <RowWrapper
        delay={0.275}
        z={1}
        position={scrollProgress[1]}
        id="1"
        onScrollProgressChange={(progress) =>
          setScrollProgress((prev) => ({ ...prev, 1: progress }))
        }
      >
        <Col xs={12} className={colClass} style={styles.largeText}>
          {sentence2.map((val, index) => (
            <span key={index}>{val}</span>
          ))}
        </Col>
      </RowWrapper>
      {/* Can riding a bike be an art? */}
      <RowWrapper
        delay={0.5}
        z={0}
        position={scrollProgress[2]}
        id="2"
        onScrollProgressChange={(progress) =>
          setScrollProgress((prev) => ({ ...prev, 2: progress }))
        }
      >
        <Col xs={12} className={colClass} style={styles.largeText}>
          {sentence3.map((val, index) => (
            <span key={index}>{val}</span>
          ))}
        </Col>
      </RowWrapper>
    </Col>
  );
}

export default Homepage;
