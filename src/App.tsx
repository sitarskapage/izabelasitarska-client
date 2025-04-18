import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/layout/Header";

function App({ children }: { children: ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Header />
        <Main footerHeight={footerHeight}>{children}</Main>
        <Footer setFooterHeight={setFooterHeight} />
      </ErrorBoundary>
    </>
  );
}

export default App;
