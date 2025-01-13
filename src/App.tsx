import { ErrorBoundary } from "react-error-boundary";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import ScrollProvider from "./contexts/providers/ScrollProvider";

function App({ children }: { children: ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);
  return (
    <>
      <ScrollProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Header />
          <Main footerHeight={footerHeight}>{children}</Main>
          <Footer setFooterHeight={setFooterHeight} />
        </ErrorBoundary>
      </ScrollProvider>
    </>
  );
}

export default App;
