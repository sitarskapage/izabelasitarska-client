import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { renderSingleItem } from "../hooks/useArrayRender";
import Image from "../components/Image";
import useCalculatePadding from "../hooks/useCalculatePadding";
import useIsMobile from "../hooks/useIsMobile";
import { motion } from "framer-motion";
import { containerSizeMiddle } from "../utils/framerMotionVariants";

export default function BioTables({ profile }: { profile: ProfileSchema }) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { paddingBottom } = useCalculatePadding();
  const isMobile = useIsMobile();

  const onMouseEnter = (_index: number, row: Element) => {
    const publicIdCell = row.querySelector("td:nth-child(4)"); // Target the 4th column for publicId
    const newPublicId = publicIdCell?.textContent?.trim();
    if (newPublicId && newPublicId !== "image_publicid") {
      // Ensure the row is not the header row
      setPublicId(newPublicId);
    }
  };

  const onMouseLeave = () => {}; // No action needed, keep image visible until next hover

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll("table tr");

    rows?.forEach((row, index) => {
      if (index > 0) {
        // Start from second row (skip header)
        row.addEventListener("mouseenter", () => onMouseEnter(index, row));
        row.addEventListener("mouseleave", onMouseLeave);
      }
    });

    return () => {
      rows?.forEach((row, index) => {
        if (index > 0) {
          row.removeEventListener("mouseenter", () => onMouseEnter(index, row));
          row.removeEventListener("mouseleave", onMouseLeave);
        }
      });
    };
  }, []);

  return (
    <Container fluid className="border-dark border-top" ref={containerRef}>
      <Row id="Tables">
        <Col className="p-0" md={6}>
          <div
            className={`border-start border-end border-dark ${
              !isMobile ? "mx-5" : ""
            }`}
          >
            {renderSingleItem(profile.additional, 1)}
          </div>
        </Col>
        {!isMobile && (
          <Col
            md={6}
            className="border-dark border-start px-0 position-relative d-flex flex-column justify-content-center"
          >
            {publicId ? (
              <motion.div
                key={publicId}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={containerSizeMiddle}
                transition={{ duration: 0.66 }}
                style={{
                  position: "sticky",
                  bottom: `calc(${paddingBottom}px + 1rem)`,
                  marginTop: "1rem",
                  top: "1rem",
                }}
                className="border-top border-bottom border-dark ratio ratio-4x3"
              >
                <Image
                  imageref={{ public_id: publicId }}
                  className="w-100 object-fit-cover h-100"
                />
              </motion.div>
            ) : (
              <p className="text-center font-monospace">
                {
                  "<= Drag your mouse over one of the links to display an image."
                }
              </p>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}
