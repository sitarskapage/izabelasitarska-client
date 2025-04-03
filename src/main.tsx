import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/theme.scss";
import { createRoot } from "react-dom/client";
import App from "./App";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { GeneralProvider } from "./contexts/providers/GeneralProvider";

createRoot(document.getElementById("root")!).render(
  <GeneralProvider>
    {/* Using BrowserRouter because of newer react-rouer compatibility issues with Framer Motion */}
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <App>
        <Router />
      </App>
    </BrowserRouter>
  </GeneralProvider>
);
