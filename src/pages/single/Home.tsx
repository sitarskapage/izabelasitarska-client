import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import RowWrapper from "../../components/Homepage/RowWrapper";

function Homepage() {
  const styles: { [key: string]: React.CSSProperties } = {
    largeText: {
      fontSize: "50vh",
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

  const [position, setPosition] = useState(0);

  const handleWheel = (event: WheelEvent) => {
    // Determine scroll direction and increment or decrement position
    const scrollDelta = event.deltaY; // Positive value means scrolling down, negative means scrolling up
    setPosition((prev) => prev + scrollDelta);
  };

  // Handle touch move event (for mobile devices)
  const handleTouchMove = (event: TouchEvent) => {
    // Get the touch movement on the Y-axis
    const touchMove = event.touches[0].clientY;

    // Calculate scroll delta (you can tweak this for more control)
    setPosition((prev) => prev + touchMove);
  };

  useEffect(() => {
    // For desktop, listen to mouse wheel events
    const wheelListener = (event: WheelEvent) => handleWheel(event);
    document.addEventListener("wheel", wheelListener);

    // For mobile, listen to touchmove events
    const touchMoveListener = (event: TouchEvent) => handleTouchMove(event);
    document.addEventListener("touchmove", touchMoveListener, {
      passive: false,
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("wheel", wheelListener);
      document.removeEventListener("touchmove", touchMoveListener);
    };
  }, []);
  // useEffect(() => console.log(position), [position]);
  return (
    <Col xs={12} style={styles.container}>
      {/* Where are we going? */}
      <RowWrapper delay={0.183} z={2} position={position}>
        {/* 0.183 = 0.5 / 1/3 */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>Where</span>
          <span>are</span>
          <span>we</span>
          <span>going?</span>
        </Col>
      </RowWrapper>
      {/* What is adrenaline today? */}
      <RowWrapper delay={0.275} z={1} position={position}>
        {/* 0.183 = 0.5 / 1/2 */}
        <Col xs={12} className={colClass} style={styles.largeText}>
          <span>What</span>
          <span>is</span>
          <span>adrenaline</span>
          <span>today?</span>
        </Col>
      </RowWrapper>
      {/* Can riding a bike be an art? */}
      <RowWrapper delay={0.5} z={0} position={position}>
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
