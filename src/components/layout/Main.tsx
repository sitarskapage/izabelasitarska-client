import { ReactNode } from "react";
import { Container, Row } from "react-bootstrap";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Row>{children}</Row>
    </Container>
  );
}
