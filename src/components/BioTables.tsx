import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from "../utils/helpers";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { renderSingleItem } from "../hooks/useArrayRender";
import Image from "../components/Image";
import useCalculatePadding from "../hooks/useCalculatePadding";

export default function BioTables({ profile }: { profile: ProfileSchema }) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { paddingBottom } = useCalculatePadding();

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
        <Col className="p-4" md={6}>
          {renderSingleItem(profile.additional, 1)}
        </Col>
        {!isMobile() && (
          <Col
            md={6}
            className="border-dark border-start px-0 position-relative d-flex flex-column justify-content-center"
          >
            {publicId && (
              <div
                style={{
                  height: "500px",
                  position: "sticky",
                  bottom: `calc(${paddingBottom}px + 1rem)`,
                  marginTop: "1rem",
                  top: "1rem",
                }}
                className="border-top border-bottom border-dark"
              >
                <Image
                  imageref={{ public_id: publicId }}
                  className="w-100 object-fit-cover h-100"
                />
              </div>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}
