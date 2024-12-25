import { ReactNode } from "react";
import useIsHome from "../../hooks/useIsHome";

export default function Main({
  children,
  footerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
}) {
  const isHome = useIsHome();
  const height = `calc(100dvh - ${footerHeight}px - 1px)`;

  return (
    <main
      className={`container-fluid d-flex flex-column`}
      style={{
        minHeight: height,
        height: isHome ? "100dvh" : "100%",
      }}
    >
      {children}
    </main>
  );
}
