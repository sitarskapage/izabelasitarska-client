import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Main({
  children,
  footerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
}) {
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => setIsHome(location.pathname == "/"), [location.pathname]);

  return (
    <main
      className={`container-fluid d-flex flex-column`}
      style={{
        minHeight: "100dvh",
        paddingBottom: !isHome ? `${footerHeight}px` : 0,
        height: isHome ? `100dvh` : "100%",
      }}
    >
      {children}
    </main>
  );
}
