import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayContextProvider } from "./context/overlayContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OverlayContextProvider>
        <App />
      </OverlayContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
