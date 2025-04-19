// import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";
import { ReactNode, useState } from "react";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/layout/Header";
import { GeneralProvider } from "./contexts/providers/GeneralProvider";

function App({ children }: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <GeneralProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Header setHeaderHeight={setHeaderHeight} />
          <Main headerHeight={headerHeight}>{children}</Main>
          {/* <Footer setFooterHeight={setHeaderHeight} /> */}
        </ErrorBoundary>
      </GeneralProvider>
    </>
  );
}

export default App;
