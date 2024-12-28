import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { renderSingleItem } from "../hooks/useArrayRender";
import Image from "./media/Image";
import useCalculatePadding from "../hooks/useCalculatePadding";
import useIsMobile from "../hooks/useIsMobile";

import { Link45deg, Link as LinkIcon } from "react-bootstrap-icons";
import { createRoot } from "react-dom/client";

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

  const renderIcon = (value: string) => {
    const isExternal = value.startsWith("http");
    return isExternal ? (
      <Link45deg className="fs-2 p-1 pb-2" />
    ) : (
      <LinkIcon className="fs-2 p-1  pb-2" />
    );
  };

  const processTable = useCallback(() => {
    const tables = containerRef.current?.querySelectorAll("table");

    tables?.forEach((table) => {
      const rows = table.querySelectorAll("tr");
      rows?.forEach((row, index) => {
        // Skip the header row (index 0)
        if (index === 0) return;

        const linkCell = row.querySelector("td:nth-child(5)");
        const linkValue = linkCell?.textContent?.trim();
        if (linkValue) {
          const isExternal = linkValue.startsWith("http");
          const icon = renderIcon(linkValue);
          linkCell!.innerHTML = "";
          const root = createRoot(linkCell!);
          root.render(
            <a href={linkValue} target={isExternal ? "_blank" : "_self"}>
              {icon}
            </a>
          );
        }
      });
    });
  }, []);

  useEffect(() => {
    processTable();
  }, [processTable, profile]);

  return (
    <Container fluid className="border-dark border-top" ref={containerRef}>
      <Row id="Tables">
        <Col className="p-0" md={6}>
          <div
            className={`border-start border-end border-dark mw-100 overflow-auto ${
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
              <div
                className="ratio ratio-4x3"
                style={{
                  position: "sticky",
                  bottom: `calc(${paddingBottom}px + 1rem)`,
                  marginTop: "1rem",
                  top: "1rem",
                }}
              >
                <Image
                  imageref={{ public_id: publicId }}
                  className="object-fit-cover w-100 h-100  border-top border-bottom border-dark"
                />
              </div>
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
