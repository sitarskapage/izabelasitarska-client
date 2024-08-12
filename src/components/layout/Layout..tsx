import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <Container>
      <Row id="SinglePageHeader">
        <Col>{title && <h1>{title}</h1>}</Col>
      </Row>
      <Row id="SinglePageContent">
        <Col>{children}</Col>
      </Row>
      <Row id="SinglePageFooter">
        <Col></Col>
      </Row>
    </Container>
  );
}
