import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRoute from "./routes/main-routes";
import { UserContextProvider } from "./context/UserContext";
import { TicketContextProvider } from "./context/TicketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <TicketContextProvider>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </TicketContextProvider>
  </UserContextProvider>
);
