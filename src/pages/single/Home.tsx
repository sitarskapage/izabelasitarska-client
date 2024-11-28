import React, { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import RowWrapper from "../../components/Homepage/RowWrapper";

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

  const colClass = "d-flex flex-column text-uppercase";

  const [scrollProgress, setScrollProgress] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
  });
  const [activeRow, setActiveRow] = useState(0);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const scrollDelta = event.deltaY;

      setScrollProgress((prev) => {
        const currentProgress = prev[activeRow] || 0;
        let newProgress = currentProgress + scrollDelta / 750;

        // Prevent overflow of scrollProgress
        newProgress = Math.max(0, Math.min(1, newProgress));

        // Handle row transition logic
        if (newProgress >= 1 && activeRow < 2) {
          // Move to the next row
          setActiveRow((prevActiveRow) => prevActiveRow + 1);
        } else if (newProgress <= 0 && activeRow > 0) {
          // Move to the previous row
          setActiveRow((prevActiveRow) => prevActiveRow - 1);
        }

        return {
          ...prev,
          [activeRow]: newProgress,
        };
      });
    },
    [activeRow]
  );

  useEffect(() => {
    const wheelListener = (event: WheelEvent) => handleWheel(event);
    document.addEventListener("wheel", wheelListener);

    return () => {
      document.removeEventListener("wheel", wheelListener);
    };
  }, [handleWheel]);

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
        {/* 0.183 = 0.5 / 1/3 */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Where</span>
          <span>are</span>
          <span>we</span>
          <span>going?</span>
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
          <span>What</span>
          <span>is</span>
          <span>adrenaline</span>
          <span>today?</span>
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
          <span>Can</span>
          <span>riding</span>
          <span>a bike</span>
          <span>be</span>
          <span>an art?</span>
        </Col>
      </RowWrapper>
    </Col>
  );
}

export default React.memo(Homepage);
