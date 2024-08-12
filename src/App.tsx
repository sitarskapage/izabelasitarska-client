import { Col, Container, Row } from "react-bootstrap";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row>
        <Col className="p-0">
          <Header />
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <Col>
          <Main>
            <Outlet />
          </Main>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
