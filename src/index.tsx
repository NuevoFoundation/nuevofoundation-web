import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import "./index.css";
import { unregister as unregisterServiceWorker } from "./registerServiceWorker";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
unregisterServiceWorker();
