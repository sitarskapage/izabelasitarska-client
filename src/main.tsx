import "./styles/theme.scss";
import { createRoot } from "react-dom/client";
import App from "./App";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { GeneralProvider } from "./contexts/providers/GeneralProvider";

createRoot(document.getElementById("root")!).render(
  <GeneralProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App>
        <Router />
      </App>
    </BrowserRouter>
  </GeneralProvider>
);
