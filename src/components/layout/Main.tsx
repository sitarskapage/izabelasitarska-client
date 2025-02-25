import { ReactNode } from "react";

export default function Main({
  children,
  footerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
}) {
  return (
    <main
      className={`container-fluid d-flex flex-column`}
      style={{
        minHeight: "100dvh",
        // paddingTop: `${headerHeight}px`,
        paddingBottom: `${footerHeight}px`,
        height: "100%",
      }}
    >
      {children}
    </main>
  );
}
