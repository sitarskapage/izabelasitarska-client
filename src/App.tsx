import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";
import { useState } from "react";

function App() {
  const [footerHeight, setFooterHeight] = useState(0);
  return (
    <>
      <Header />
      <Main footerHeight={footerHeight}>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Outlet />
        </ErrorBoundary>
      </Main>
      <Footer setFooterHeight={setFooterHeight} />
    </>
  );
}

export default App;
