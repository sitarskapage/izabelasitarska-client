import "./styles/theme.scss";
import { createRoot } from "react-dom/client";
import App from "./App";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App>
      <Router />
    </App>
  </BrowserRouter>
);
