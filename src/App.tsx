import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/layout/Header";
import { GeneralProvider } from "./contexts/providers/GeneralProvider";

function App({ children }: { children: ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <>
      <GeneralProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Header />
          <Main footerHeight={footerHeight}>{children}</Main>
          <Footer setFooterHeight={setFooterHeight} />
        </ErrorBoundary>
      </GeneralProvider>
    </>
  );
}

export default App;
