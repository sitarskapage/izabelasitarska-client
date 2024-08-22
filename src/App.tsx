import { Container } from "react-bootstrap";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { Outlet } from "react-router-dom";
import Theme from "./theme/Theme";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";

function App() {
  return (
    <Theme>
      <Container fluid className="d-flex flex-column vh-100">
        <Header />
        <Main>
          <ErrorBoundary FallbackComponent={Fallback}>
            <Outlet />
          </ErrorBoundary>
        </Main>
        <Footer />
      </Container>
    </Theme>
  );
}

export default App;
