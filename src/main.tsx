import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Optional: Set default DaisyUI theme here
document.documentElement.setAttribute("data-theme", "emelephant", );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
