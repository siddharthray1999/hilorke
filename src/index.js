import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  // <StrictMode> // enable this in production mode
  <App />
  // </StrictMode>
);
