import { ReactNode } from "react";
import { Row } from "react-bootstrap";

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      <Row id="SinglePageHeader">{title && <h1>{title}</h1>}</Row>
      <Row id="SinglePageContent" className="flex-grow-1">
        {children}
      </Row>
      <Row id="SinglePageFooter"></Row>
    </>
  );
}
