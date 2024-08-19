import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { GeneralProvider } from "./components/contexts/GeneralContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GeneralProvider>
      <Router />
    </GeneralProvider>
  </StrictMode>
);
