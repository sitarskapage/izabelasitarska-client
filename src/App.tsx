import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";

function App({ children }: { children: ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Header setHeaderHeight={setHeaderHeight} />
        <Main footerHeight={footerHeight} headerHeight={headerHeight}>
          {children}
        </Main>
        <Footer setFooterHeight={setFooterHeight} />
      </ErrorBoundary>
    </>
  );
}

export default App;
