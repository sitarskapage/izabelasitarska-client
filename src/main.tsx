import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
