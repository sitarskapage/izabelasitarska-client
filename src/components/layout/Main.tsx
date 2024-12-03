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
  useEffect(() => console.log(isHome), [isHome]);

  return (
    <main
      className={`container-fluid d-flex flex-column`}
      style={{
        minHeight: "100dvh",
        paddingBottom: `${footerHeight}px`,
        height: isHome ? `calc(100vh - ${footerHeight}px)` : "100%",
      }}
    >
      {children}
    </main>
  );
}
