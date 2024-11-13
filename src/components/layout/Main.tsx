import { ReactNode } from "react";
import useCalculatePadding from "../../hooks/useCalculatePadding";

export default function Main({ children }: { children: ReactNode }) {
  const { paddingTop: pt, paddingBottom: pb } = useCalculatePadding();

  return (
    <main
      className="container d-flex flex-column"
      style={{
        minHeight: "100dvh",
        paddingTop: `calc(${pt}px + 1rem)`,
        paddingBottom: `calc(${pb}px + 1rem)`,
      }}
    >
      {children}
    </main>
  );
}
