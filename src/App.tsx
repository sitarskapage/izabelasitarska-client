import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/layout/Header";
import { Curtain } from "./components/Curtain";
import { useLocation } from "react-router-dom";

function App({ children }: { children: ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const location = useLocation();

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Curtain key={location.key} />
        <Header />
        <Main footerHeight={footerHeight}>{children}</Main>
        <Footer setFooterHeight={setFooterHeight} />
      </ErrorBoundary>
    </>
  );
}

export default App;
