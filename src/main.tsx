import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/theme.scss";
import { createRoot } from "react-dom/client";
import { GeneralProvider } from "./contexts/GeneralContext";
import App from "./App";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <GeneralProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App>
        <Router />
      </App>
    </BrowserRouter>
  </GeneralProvider>
);
