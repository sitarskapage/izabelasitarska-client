import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import { GeneralProvider } from "./contexts/GeneralContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GeneralProvider>
      <Router />
    </GeneralProvider>
  </StrictMode>
);
