import { ReactNode } from "react";
import useCalculatePadding from "../../hooks/useCalculatePadding";

export default function Main({ children }: { children: ReactNode }) {
  const { paddingTop: pt, paddingBottom: pb } = useCalculatePadding();

  return (
    <main
      className="container-fluid d-flex flex-column"
      style={{
        minHeight: "100dvh",
        paddingTop: `calc(${pt}px)`,
        paddingBottom: `calc(${pb}px)`,
      }}
    >
      {children}
    </main>
  );
}
