import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./_app";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement!);
root.render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </BrowserRouter>
);
