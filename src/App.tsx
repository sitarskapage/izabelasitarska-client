import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";

function App() {
  return (
    <>
      <Header />
      <Main>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Outlet />
        </ErrorBoundary>
      </Main>
      <Footer />
    </>
  );
}

export default App;
