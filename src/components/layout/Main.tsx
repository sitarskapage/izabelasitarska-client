import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export default function Main({
  children,
  footerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
}) {
  const location = useLocation();

  const isHome = location.pathname == "/";

  return (
    <main
      className={`container-fluid d-flex flex-column ${isHome && "h-100"}`}
      style={{
        minHeight: "100dvh",
        paddingTop: `${0}px`,
        paddingBottom: `${footerHeight}px`,
      }}
    >
      {children}
    </main>
  );
}
