import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="container d-flex flex-column flex-grow-1">{children}</main>
  );
}
