import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
