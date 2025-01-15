import { ReactNode } from "react";

export default function Main({
  children,
  footerHeight,
  headerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
  headerHeight: number;
}) {
  return (
    <main
      className={`container d-flex flex-column`}
      style={{
        minHeight: "100dvh",
        paddingTop: `${headerHeight}px`,
        paddingBottom: `${footerHeight}px`,
        height: "100%",
      }}
    >
      {children}
    </main>
  );
}
